import * as React from "react";
import {Row, Col, Upload, Divider, Input, Icon, Popover, Form, Popconfirm, Tag, Modal, Button} from "antd";

import {FriendCircle} from "../../components/wechat/friend-cricle/friend-cricle";
import {FriendCircleMessage} from "../../components/wechat/friend-cricle/messages";
import {EmojiPicker} from "../../utils";

import defaultBackgroundPicture from "../../assets/img/wechat-friend-default-background.jpg";
import defaultUserAvatar from "../../assets/img/default_avatar1.jpg";

import styles from "../../assets/css/site-friend-circle.module.css";

const {TextArea} = Input;

interface FriendStats {
    userName: string;
    userAvatar: string;
    backgroundPicture: string;
    messages: FriendCircleMessage[];
    currentInputMessage: FriendCircleMessage,
    appendLikeVisible: boolean;
    currentLikeUser: string;
}

export class Friend extends React.Component<{}, FriendStats> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            backgroundPicture: defaultBackgroundPicture,
            userAvatar: defaultUserAvatar,
            userName: "时光",
            appendLikeVisible: false,
            currentLikeUser: "",
            currentInputMessage: {
                userName: "时光",
                message: "",
                userAvatar: defaultUserAvatar,
                like: [],
                comments: [],
                timestamp: new Date(),
            },
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

                        <Row type={"flex"} justify={"space-around"} align={"middle"}>
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

                        <Row type={"flex"} align={"middle"} justify={"center"} gutter={24}>
                            <h2>编辑新的朋友圈信息</h2>
                        </Row>
                        <div className={styles.form}>
                            <Row type={"flex"} align={"middle"} justify={"start"} gutter={24}>
                                <Col span={4}>
                                    <strong>头像:</strong>
                                </Col>
                                <Col span={4}>
                                    <Upload
                                        name="avatar" listType="picture" className={styles.avatar} showUploadList={false}
                                        onChange={(info) => {
                                            const reader = new FileReader();
                                            reader.addEventListener("load", () => {
                                                const msg = this.state.currentInputMessage;
                                                msg.userAvatar = reader.result as string;
                                                this.setState({currentInputMessage: msg});
                                            });
                                            reader.readAsDataURL(info.file.originFileObj as File);
                                        }}
                                    >
                                        <img src={this.state.currentInputMessage.userAvatar} alt={"头像"} className={styles.avatar}/>
                                    </Upload>
                                </Col>
                            </Row>
                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col span={4}>
                                    <strong>用户:</strong>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        size={"small"}
                                        placeholder={this.state.currentInputMessage.userName}
                                        onChange={(e: any) => {
                                            const msg = this.state.currentInputMessage;
                                            msg.userName = e.target.value;
                                            this.setState({currentInputMessage: msg});
                                        }}
                                        value={this.state.currentInputMessage.userName}
                                        suffix={
                                            <Popover
                                                trigger={"click"}
                                                content={
                                                    <EmojiPicker
                                                        onSelect={(emoji: string) => {
                                                            const msg = this.state.currentInputMessage;
                                                            msg.userName = msg.userName + emoji;
                                                            this.setState({currentInputMessage: msg});
                                                        }}
                                                    />
                                                }
                                                placement={"bottom"}>
                                                <Icon type="frown" style={{color: "rgba(0,0,0,.45)"}}/>
                                            </Popover>
                                        }
                                    />
                                </Col>
                            </Row>

                            <Divider dashed={true}/>

                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col span={4}>
                                    <strong>内容:</strong>
                                </Col>
                                <Col span={15}>
                                    <TextArea
                                        onChange={(e: any) => {
                                            const msg = this.state.currentInputMessage;
                                            msg.message = e.target.value;
                                            this.setState({currentInputMessage: msg});
                                        }}
                                        value={this.state.currentInputMessage.message}
                                    />
                                </Col>
                                <Col span={1}>
                                    <Popover
                                        trigger={"click"}
                                        content={
                                            <EmojiPicker
                                                onSelect={(emoji: string) => {
                                                    const msg = this.state.currentInputMessage;
                                                    msg.message = msg.message + emoji;
                                                    this.setState({currentInputMessage: msg});
                                                }}
                                            />
                                        }
                                        placement={"right"}>
                                        <Icon type="frown" style={{color: "rgba(0,0,0,.45)"}}/>
                                    </Popover>
                                </Col>
                            </Row>

                            <Divider dashed={true}/>

                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col span={4}>
                                    <strong>点赞:</strong>
                                </Col>
                                <Col span={18}>
                                    <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                        {this.state.currentInputMessage.like.map((lk, index) => {
                                            return (
                                                <Tag
                                                    key={index}
                                                    closable={true}
                                                    onClose={(e: any) => {
                                                        e.preventDefault();
                                                        const currentLike = this.state.currentInputMessage.like.slice(0);
                                                        currentLike.splice(index, 1);
                                                        const cmg = this.state.currentInputMessage;
                                                        cmg.like = currentLike;
                                                        this.setState({currentInputMessage: cmg});
                                                    }}
                                                >
                                                    {lk}
                                                </Tag>
                                            );
                                        })}
                                        <Icon type="plus" onClick={() => this.setState({appendLikeVisible: true})}/>
                                        <Modal
                                            title={"点赞"}
                                            okText={"点赞"}
                                            cancelText={"取消"}
                                            onCancel={() => this.setState({appendLikeVisible: false})}
                                            onOk={() => {
                                                if (this.state.currentLikeUser) {
                                                    const currentLike = this.state.currentInputMessage.like.slice(0);
                                                    currentLike.push(this.state.currentLikeUser);
                                                    const cmg = Object.assign({}, this.state.currentInputMessage);
                                                    cmg.like = currentLike;
                                                    this.setState({
                                                        currentLikeUser: "",
                                                        currentInputMessage: cmg,
                                                        appendLikeVisible: false,
                                                    })
                                                } else {
                                                    this.setState({
                                                        appendLikeVisible: false,
                                                    })
                                                }
                                            }}
                                            visible={this.state.appendLikeVisible}
                                        >
                                            <Input
                                                autoFocus={true}
                                                placeholder={this.state.currentLikeUser}
                                                onChange={(e: any) => this.setState({currentLikeUser: e.target.value})}
                                                value={this.state.currentLikeUser}
                                                prefix={<Icon type={"user"}/>}
                                                suffix={
                                                    <Popover
                                                        trigger={"click"}
                                                        content={
                                                            <EmojiPicker
                                                                onSelect={(emoji: string) => {
                                                                    let lkUser: string = this.state.currentLikeUser;
                                                                    lkUser += emoji;
                                                                    this.setState({currentLikeUser: lkUser});
                                                                }}
                                                            />
                                                        }
                                                        placement={"bottom"}>
                                                        <Icon type="frown" style={{color: "rgba(0,0,0,.45)"}}/>
                                                    </Popover>
                                                }
                                            />
                                        </Modal>
                                    </Row>
                                </Col>
                            </Row>

                            <Divider dashed={true}/>

                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col offset={18} span={6}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            let msgs: FriendCircleMessage[] = this.state.messages;
                                            const cmsg: FriendCircleMessage = Object.assign({}, this.state.currentInputMessage);
                                            msgs.push(cmsg);
                                            this.setState({messages: msgs});
                                        }}
                                    >
                                        发送
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
            ;
    }
}
