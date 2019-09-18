import * as React from "react";
import Particles, {IParticlesParams} from "react-particles-js";

import {Carousel, Statistic, Row, Col, Button, Divider} from "antd";
import {Link} from "react-router-dom";

import styles from "../assets/css/home.module.css";

import chatSample1 from "../assets/img/sample/wechat-chat-sample1.png";
import chatSample2 from "../assets/img/sample/wechat-chat-sample2.png";
import chatSample3 from "../assets/img/sample/wechat-chat-sample3.png";
import chatSample4 from "../assets/img/sample/wechat-chat-sample4.png";
import friendCircleSample1 from "../assets/img/sample/wechat-friend-circle-sample1.png";
import friendCircleSample2 from "../assets/img/sample/wechat-friend-circle-sample2.png";
import friendCircleSample3 from "../assets/img/sample/wechat-friend-circle-sample3.png";

import {SiteKeys} from "../components/site";

const particlesConfig: IParticlesParams = {
    "particles": {
        "number": {
            "value": 270,
            "density": {
                "enable": true,
                "value_area": 552.4033491425909
            }
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "polygon",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 6,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 500,
            "color": "#ffffff",
            "opacity": 1,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "bottom",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 4,
                "duration": 0.3,
                "opacity": 1
            },
            "repulse": {
                "distance": 135.86413586413587,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": false
};

export class Home extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.home}>
                <Particles
                    canvasClassName={styles.particles}
                    params={particlesConfig}
                />
                <Row gutter={24} align={"middle"} justify={"center"} type={"flex"}>
                    <Col offset={4} span={4}>
                        <h1>微信对话</h1>
                        <Carousel autoplay={true} effect="scrollx">
                            <div>
                                <img src={chatSample1} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={chatSample2} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={chatSample3} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={chatSample4} alt={"样例"}/>
                            </div>
                        </Carousel>
                    </Col>
                    <Col offset={4} span={12}>
                        <ul>
                            <li>转账信息</li>
                            <li>红包信息</li>
                            <li>图文信息</li>
                            <li>表情包信息</li>
                            <li>语音信息</li>
                            <li>多种系统消息</li>
                            <li>
                                <Button type={"link"} size={"large"} className={styles.button}>
                                    <Link to={SiteKeys.WeChatChat}>制作对话</Link>
                                </Button>
                            </li>
                        </ul>

                    </Col>
                </Row>

                <Divider/>

                <Row gutter={24} align={"middle"} justify={"center"} type={"flex"}>
                    <Col offset={4} span={12}>
                        <ul>
                            <li>朋友圈定位</li>
                            <li>图文消息</li>
                            <li>表情包信息</li>
                            <li>点赞与评论</li>
                            <li>
                                <Button type={"link"} size={"large"} className={styles.button}>
                                    <Link to={SiteKeys.WeChatFriends}>制作朋友圈</Link>
                                </Button>
                            </li>
                        </ul>

                    </Col>
                    <Col span={4}>
                        <h1>朋友圈</h1>
                        <Carousel autoplay={true} effect="scrollx">
                            <div>
                                <img src={friendCircleSample1} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={friendCircleSample2} alt={"样例"}/>
                            </div>
                            <div>
                                <img src={friendCircleSample3} alt={"样例"}/>
                            </div>
                        </Carousel>
                    </Col>
                </Row>

                <Divider/>

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
