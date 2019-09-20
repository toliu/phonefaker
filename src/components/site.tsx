import "antd/dist/antd.css";

import * as React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Icon} from "antd";

import styles from "../assets/css/site.module.css";

const {SubMenu} = Menu;
const {Header, Content, Footer} = Layout;

export enum SiteKeys {
    Home = "/home",
    WeChatChat = "/wechat/chat",
    WeChatFriends = "/wechat/friendCircle",
    WeiboChat = "/weibo/chat",
    WeiboNews = "/weibo/news",
    QQChat = "/tencent/chat",
    QQZone = "/tencent/zone",
    ZhiHu = "/zhihu",
    Twitter = "/twitter",
    FaceBook = "/facebook",
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
                        <Menu.Item>
                            <Link to={SiteKeys.Home}>
                                <span className={styles.home}>首页</span>
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

                        <SubMenu title={<span><Icon type="qq"/>QQ</span>}>
                            <Menu.Item key={SiteKeys.QQChat}>
                                <Link to={SiteKeys.QQChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item key={SiteKeys.QQZone}>
                                <Link to={SiteKeys.QQZone}>空间</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu title={<span><Icon type="weibo"/>微博</span>}>
                            <Menu.Item key={SiteKeys.WeiboChat}>
                                <Link to={SiteKeys.WeiboChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item key={SiteKeys.WeiboNews}>
                                <Link to={SiteKeys.WeiboNews}>动态</Link>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key={SiteKeys.ZhiHu}>
                            <Link to={SiteKeys.ZhiHu}><span><Icon type="zhihu"/>知乎</span></Link>
                        </Menu.Item>

                        <Menu.Item key={SiteKeys.Twitter}>
                            <Link to={SiteKeys.Twitter}><span><Icon type="twitter"/>Twitter</span></Link>
                        </Menu.Item>

                        <Menu.Item key={SiteKeys.FaceBook}>
                            <Link to={SiteKeys.FaceBook}><span><Icon type="facebook"/>Facebook</span></Link>
                        </Menu.Item>

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
