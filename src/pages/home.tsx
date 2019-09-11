import * as React from "react";

import {Carousel, Statistic, Row, Col, Button} from "antd";
import {Link} from "react-router-dom";

import styles from "../assets/css/home.module.css";

import chatSample1 from "../assets/img/sample/wechat_chat_sample1.png";
import chatSample2 from "../assets/img/sample/wechat_chat_sample2.png";
import chatSample3 from "../assets/img/sample/wechat_chat_sample3.png";
import {SiteKeys} from "../components/site";

export class Home extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.home}>
                <Row align={"middle"}>
                    <Col span={24}>
                        <h1 style={{textAlign: "center", color: "#8a92ff"}}>免费使用</h1>
                    </Col>
                </Row>
                <Row gutter={16} align={"middle"}>
                    <Col span={16}>
                        <h1>生成微信对话</h1>
                        <h6> 支持转账消息 </h6>
                        <h6> 支持语音信息 </h6>
                        <h6> 支持多种系统消息 </h6>
                        <Button type={"primary"} size={"large"} className={styles.button}>
                            <Link to={SiteKeys.WeChatChat}>开始制作</Link>
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Carousel autoplay={true} effect="fade">
                            <div>
                                <img src={chatSample1} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={chatSample2} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={chatSample3} alt={"样例"}/>
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Statistic title="总访问量" value={112893}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title="当前在线人数" value={113}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
