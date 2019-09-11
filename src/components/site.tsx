import 'antd/dist/antd.css';

import * as React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Icon} from "antd";

import homeIcon from "../assets/img/home.png";

import styles from "../assets/css/site.module.css";

const {SubMenu} = Menu;
const {Header, Content, Footer} = Layout;

export enum SiteKeys {
    Home = "/home",
    WeChatChat = "/wechat/chat",
    WeChatFriends = "/wechat/friendCircle"
}

interface SiteStats {
    key: SiteKeys,
}

export class Site extends React.Component<{}, SiteStats> {
    constructor(props: any) {
        super(props);
        this.state = {
            key: SiteKeys.WeChatChat,
        }
    }

    public render(): React.ReactElement {
        return (
            <Layout>
                <Header className="header">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.state.key]}
                        className={styles.menu}
                        onClick={(e: any) => this.setState({key: e.key})}
                    >
                        <Menu.Item key={SiteKeys.Home}>
                            <Link to={SiteKeys.Home}>
                                <img className={styles.home} src={homeIcon} alt={"首页"}/>
                            </Link>
                        </Menu.Item>
                        <SubMenu title={<span><Icon type="wechat"/>微信</span>}>
                            <Menu.Item key={SiteKeys.WeChatChat}>
                                <Link to={SiteKeys.WeChatChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item key={SiteKeys.WeChatFriends}>
                                <Link to={SiteKeys.WeChatFriends}>朋友圈</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content className={styles.body}>
                    {this.props.children}
                </Content>
                <Footer className={styles.footer}>Phone Faker ©2019 Created by <a href={"Mailto:1928385951@qq.com"}>时光</a></Footer>
            </Layout>
        );
    }

}
