import * as React from "react";

import {Statistic, Row, Col, Icon} from "antd";
import {Link} from "react-router-dom";

import styles from "../assets/css/home.module.css";

import {SiteKeys} from "../components/site";


export class Home extends React.Component<{}, {}> {

    public render(): React.ReactElement {

        const siteMaps: string[][] = [
            ["聊天", SiteKeys.WeChatChat, "wechat"],
            ["朋友圈", SiteKeys.WeChatFriends, "wechat"],
            ["聊天", SiteKeys.QQChat, "qq"],
            ["QQ空间", SiteKeys.QQZone, "qq"],
            ["私聊", SiteKeys.WeiboChat, "weibo"],
            ["新闻", SiteKeys.WeiboNews, "weibo"],
            ["知乎", SiteKeys.ZhiHu, "zhihu"],
            ["推特", SiteKeys.Twitter, "twitter"],
            ["FaceBook", SiteKeys.FaceBook, "facebook"],
        ];


        return (
            <div className={styles.home}>
                <div className={styles.wechat}>
                    <Row gutter={24} align={"middle"} justify={"center"} type={"flex"} className={styles.chat}>
                        <Col offset={14} span={10}>
                            <h1>简单便捷的操作</h1>
                            <ul>
                                <li>轻松制作微信聊天,支持转账、红包以及多种系统信息</li>
                                <li>方便的操作，点击手机即可对手机进行快速的修改</li>
                            </ul>

                            <Row gutter={24} align={"middle"} justify={"start"} type={"flex"}>
                                {siteMaps.map((item: string[], index: number) => {
                                    return (
                                        <Col span={8} key={index}>
                                            <Link to={item[1]} style={{fontSize: "2em"}}>
                                                <Icon type={item[2]}/>
                                                {item[0]}
                                            </Link>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Row gutter={24} align={"middle"} justify={"center"} type={"flex"}>
                    <Col offset={6} span={6}>
                        <Statistic title="总访问量" value={112893}/>
                    </Col>
                    <Col offset={6} span={6}>
                        <Statistic title="当前在线人数" value={113}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
