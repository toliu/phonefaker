import "antd/dist/antd.css";

import * as React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Icon, Form, Input, Button, Row, Col, message} from "antd";

import styles from "../assets/css/site.module.css";

const {SubMenu} = Menu;
const {TextArea} = Input;
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
    form: {
        contact: string;
        content: string;
    };
}

export class Site extends React.Component<{}, SiteStats> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                contact: "",
                content: "",
            }
        };
    }

    public render(): React.ReactElement {
        return (
            <Layout>
                <Header className={styles.header}>
                    <Link to={SiteKeys.Home} className={styles.home}/>
                    <Menu theme="light" mode="horizontal" className={styles.menu}>
                        <SubMenu title={<span><Icon type="wechat"/>微信</span>}>
                            <Menu.Item>
                                <Link to={SiteKeys.WeChatChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={SiteKeys.WeChatFriends}>朋友圈</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="qq"/>QQ</span>}>
                            <Menu.Item>
                                <Link to={SiteKeys.QQChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={SiteKeys.QQZone}>空间</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="weibo"/>微博</span>}>
                            <Menu.Item>
                                <Link to={SiteKeys.WeiboChat}>聊天</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={SiteKeys.WeiboNews}>动态</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item>
                            <Link to={SiteKeys.ZhiHu}><span><Icon type="zhihu"/>知乎</span></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={SiteKeys.Twitter}><span><Icon type="twitter"/>Twitter</span></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={SiteKeys.FaceBook}><span><Icon type="facebook"/>Facebook</span></Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Content className={styles.body}>
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer className={styles.footer}>
                    <Row gutter={24} align={"middle"} justify={"center"} type={"flex"}>
                        <Col span={6}>
                            <Form layout={"vertical"}>
                                <Form.Item label="提交改进意见：" required={true}>
                                    <TextArea
                                        placeholder="改进意见"
                                        onChange={(e) => {
                                            const form = this.state.form;
                                            form.content = e.target.value;
                                            this.setState({form})
                                        }}
                                        value={this.state.form.content}
                                    />
                                </Form.Item>
                                <Form.Item label="联系方式：" required={true}>
                                    <Input
                                        placeholder="邮箱 / 电话 / QQ / 微信"
                                        onChange={(e) => {
                                            const form = this.state.form;
                                            form.contact = e.target.value;
                                            this.setState({form})
                                        }}
                                        value={this.state.form.contact}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={(e: any) => {
                                        const form = this.state.form;
                                        if (form.contact && form.content) {
                                            this.setState({form: {content: "", contact: form.contact}});
                                            message.success("提交成功！")
                                        } else {
                                            message.error("需要完善表格！")
                                        }
                                    }}>提交</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <p>Phone Faker ©2019 Created by <a href={"Mailto:1928385951@qq.com"}>时光</a></p>
                </Footer>
            </Layout>
        );
    }

}
