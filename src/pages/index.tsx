import 'antd/dist/antd.css';

import * as React from "react";
import {Layout, Menu, Icon} from 'antd';

import styles from "./assets/css/index.module.css";
import {Developing} from "./developing";
import {Chat} from "./wechat/chat";

const {SubMenu} = Menu;
const {Header, Content, Footer} = Layout;

enum MenuKeys {
    WechatChat = "wechat chat",
    WechatFriends = "wechat circle of friends"
}

interface IndexStats {
    selectedKey: MenuKeys;
}

export class Index extends React.Component<{}, IndexStats> {
    private readonly keyMaps: { [key: string]: React.ReactElement };

    constructor(props: any) {
        super(props);
        this.switchMenu = this.switchMenu.bind(this);

        this.keyMaps = {};
        this.keyMaps[MenuKeys.WechatChat] = <Chat/>;

        this.state = {
            selectedKey: MenuKeys.WechatChat,
        };
    }

    public render(): React.ReactElement {
        return (
            <Layout>
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.state.selectedKey]}
                          className={styles.menu} onSelect={this.switchMenu}>
                        <SubMenu title={<span><Icon type="wechat"/>微信</span>}>
                            <Menu.Item key={MenuKeys.WechatChat}>聊天</Menu.Item>
                            <Menu.Item key={MenuKeys.WechatFriends}>朋友圈</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content className={styles.body}>
                    {this.state.selectedKey in this.keyMaps ? this.keyMaps[this.state.selectedKey] : <Developing/>}
                </Content>
                <Footer className={styles.footer}>Phone Faker ©2019 Created by <a href={"Mailto:1928385951@qq.com"}>时光</a></Footer>
            </Layout>
        );
    }

    private switchMenu(e: any) {
        this.setState({selectedKey: e.key})
    }
}