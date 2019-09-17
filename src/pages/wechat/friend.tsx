import {Picker} from "emoji-mart";
import * as React from "react";
import {Row, Col, Upload, Divider, Input, Icon, Tooltip, Button, Popover} from "antd";

import {FriendCircle} from "../../components/wechat/friend-cricle/friend-cricle";
import {FriendCircleMessage} from "../../components/wechat/friend-cricle/messages";

import defaultBackgroundPicture from "../../assets/img/wechat-friend-default-background.jpg";
import defaultUserAvatar from "../../assets/img/default_avatar1.jpg";

import styles from "../../assets/css/site-friend-circle.module.css";
import {EmojiPicker} from "../../utils";

interface FriendStats {
    userName: string;
    userAvatar: string;
    backgroundPicture: string;
    messages: FriendCircleMessage[];
}

export class Friend extends React.Component<{}, FriendStats> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            backgroundPicture: defaultBackgroundPicture,
            userAvatar: defaultUserAvatar,
            userName: "时光",
        };
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <Row align={"middle"}>
                    <Col span={8} offset={4}>
                        <FriendCircle
                            messages={this.state.messages}
                            userName={this.state.userName}
                            userAvatar={this.state.userAvatar}
                            backgroundImage={this.state.backgroundPicture}
                        />
                    </Col>
                    <Col span={8} order={4}>
                        <Row align={"middle"}>
                            <Col span={2}>
                                <strong>用户名:</strong>
                            </Col>
                            <Col offset={1} span={5}>
                                <Input
                                    placeholder={this.state.userName}
                                    prefix={<Icon type={"user"} style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    suffix={
                                        <Popover
                                            trigger={"click"}
                                            content={<EmojiPicker onSelect={(emoji: string) => {
                                                this.setState({userName: this.state.userName + emoji})
                                            }}/>}
                                            placement={"bottom"}>
                                            <Icon type="frown" style={{color: "rgba(0,0,0,.45)"}}/>
                                        </Popover>
                                    }
                                    onChange={(e: any) => {
                                        this.setState({userName: e.target.value})
                                    }}
                                    size={"small"}
                                />
                            </Col>
                        </Row>

                        <Divider dashed={true}/>

                        <Row align={"middle"}>
                            <Col span={2}>
                                <strong>背景:</strong>
                            </Col>
                            <Col span={10}>
                                <Upload
                                    name="avatar" listType="picture-card" className={styles["uploader-icon"]} showUploadList={false}
                                    onChange={(info) => {
                                        const reader = new FileReader();
                                        reader.addEventListener("load", () => {
                                            this.setState({backgroundPicture: reader.result as string});
                                        });
                                        reader.readAsDataURL(info.file.originFileObj as File);
                                    }}
                                >
                                    <img src={this.state.backgroundPicture} alt={"背景"} className={styles["uploader-icon"]}/>
                                </Upload>
                            </Col>
                            <Col span={2}>
                                <strong>头像:</strong>
                            </Col>
                            <Col span={10}>
                                <Upload
                                    name="avatar" listType="picture-card" className={styles["uploader-icon"]} showUploadList={false}
                                    onChange={(info) => {
                                        const reader = new FileReader();
                                        reader.addEventListener("load", () => {
                                            this.setState({userAvatar: reader.result as string});
                                        });
                                        reader.readAsDataURL(info.file.originFileObj as File);
                                    }}
                                >
                                    <img src={this.state.userAvatar} alt={"头像"} className={styles["uploader-icon"]}/>
                                </Upload>
                            </Col>
                        </Row>
                        <Divider dashed={true}/>

                    </Col>
                </Row>
            </React.Fragment>
        );
    }

}
