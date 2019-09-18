import * as moment from "moment";
import * as React from "react";
import {Row, Col, Upload, Divider, Input, Icon, Popover, Tag, Modal, Button, message, DatePicker, TimePicker} from "antd";

import {FriendCircle} from "../../components/wechat/friend-cricle/friend-cricle";
import {CommentMessage, FriendCircleMessage} from "../../components/wechat/friend-cricle/messages";
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
    currentLikeUser: string;
    currentInputComment: CommentMessage;
    currentInputPictureList: any[];

    appendLikeVisible: boolean;
    appendCommentVisible: boolean;
    appendAdditionPictureVisible: boolean;
}

export class Friend extends React.Component<{}, FriendStats> {
    private readonly defaultUserName: string;

    constructor(props: any) {
        super(props);
        this.defaultUserName = "时光";
        this.state = {
            messages: [],
            backgroundPicture: defaultBackgroundPicture,
            userAvatar: defaultUserAvatar,
            userName: this.defaultUserName,
            currentLikeUser: "",
            currentInputComment: {
                by: "",
                to: this.defaultUserName,
                content: "",
            },
            currentInputPictureList: [],
            currentInputMessage: {
                userName: this.defaultUserName,
                message: "",
                userAvatar: defaultUserAvatar,
                like: [],
                comments: [],
                timestamp: new Date(),
            },

            appendLikeVisible: false,
            appendCommentVisible: false,
            appendAdditionPictureVisible: false,
        };
    }

    public render(): React.ReactElement {

        return (
            <div className={styles.main}>
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
                                    <strong>配图:</strong>
                                </Col>
                                <Col span={15}>
                                    <div className="clearfix">
                                        <Upload
                                            listType="picture-card"
                                            fileList={this.state.currentInputPictureList}
                                            onChange={async ({fileList}) => {
                                                let fileSrcs: string[] = [];
                                                for (let uploadFile of fileList) {
                                                    const fbase64: string = await Friend.fileBase64(uploadFile.originFileObj as File);
                                                    fileSrcs.push(fbase64);
                                                }
                                                const message: FriendCircleMessage = Object.assign({}, this.state.currentInputMessage);
                                                message.addition = {
                                                    kind: "pictures",
                                                    pictures: fileSrcs,
                                                };

                                                this.setState({
                                                    currentInputPictureList: fileList,
                                                    currentInputMessage: message,
                                                })
                                            }}
                                        >
                                            {this.state.currentInputPictureList.length >= 9 ?
                                                null :
                                                <div>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传</div>
                                                </div>
                                            }
                                        </Upload>
                                    </div>
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
                                <Col span={4}>
                                    <strong>评论:</strong>
                                </Col>
                                <Col span={18}>
                                    <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                        {this.state.currentInputMessage.comments.map((cmt, index) => {
                                            return (
                                                <Tag
                                                    key={index}
                                                    closable={true}
                                                    onClose={(e: any) => {
                                                        e.preventDefault();
                                                        const currentComments = this.state.currentInputMessage.comments.slice(0);
                                                        currentComments.splice(index, 1);
                                                        const cmg = this.state.currentInputMessage;
                                                        cmg.comments = currentComments;
                                                        this.setState({currentInputMessage: cmg});
                                                    }}
                                                >
                                                    {cmt.by} -> {cmt.to} : {cmt.content}
                                                </Tag>
                                            );
                                        })}
                                        <Icon type="plus" onClick={() => this.setState({appendCommentVisible: true})}/>
                                        <Modal
                                            title={"添加评论"}
                                            okText={"评论"}
                                            cancelText={"取消"}
                                            onCancel={() => this.setState({appendCommentVisible: false})}
                                            onOk={() => {
                                                const comment: CommentMessage = Object.assign({}, this.state.currentInputComment);
                                                if (comment.content && comment.by) {
                                                    const currentComments = this.state.currentInputMessage.comments.slice(0);
                                                    if (comment.to === this.state.currentInputMessage.userName) {
                                                        comment.to = "";
                                                    }
                                                    currentComments.push(comment);
                                                    const cmg = Object.assign({}, this.state.currentInputMessage);
                                                    cmg.comments = currentComments;
                                                    this.setState({
                                                        currentInputComment: {
                                                            by: "",
                                                            to: this.state.userName,
                                                            content: "",
                                                        },
                                                        currentInputMessage: cmg,
                                                        appendCommentVisible: false,
                                                    })
                                                } else {
                                                    this.setState({
                                                        appendCommentVisible: false,
                                                    })
                                                }
                                            }}
                                            visible={this.state.appendCommentVisible}
                                        >
                                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                                <Col span={4}>
                                                    <strong>来自：</strong>
                                                </Col>
                                                <Col span={12}>
                                                    <Input
                                                        autoFocus={true}
                                                        placeholder={this.state.currentInputComment.by}
                                                        onChange={(e: any) => {
                                                            const ccmt: CommentMessage = Object.assign({}, this.state.currentInputComment);
                                                            ccmt.by = e.target.value;
                                                            this.setState({currentInputComment: ccmt})
                                                        }}
                                                        value={this.state.currentInputComment.by}
                                                        prefix={<Icon type={"user"}/>}
                                                        suffix={
                                                            <Popover
                                                                trigger={"click"}
                                                                content={
                                                                    <EmojiPicker
                                                                        onSelect={(emoji: string) => {
                                                                            let comment: CommentMessage = Object.assign({}, this.state.currentInputComment);
                                                                            comment.by += emoji;
                                                                            this.setState({currentInputComment: comment});
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

                                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                                <Col span={4}>
                                                    <strong>评论给：</strong>
                                                </Col>
                                                <Col span={12}>
                                                    <Input
                                                        placeholder={this.state.userName}
                                                        onChange={(e: any) => {
                                                            const ccmt: CommentMessage = Object.assign({}, this.state.currentInputComment);
                                                            ccmt.to = e.target.value;
                                                            this.setState({currentInputComment: ccmt})
                                                        }}
                                                        value={this.state.currentInputComment.to}
                                                        prefix={<Icon type={"user"}/>}
                                                        suffix={
                                                            <Popover
                                                                trigger={"click"}
                                                                content={
                                                                    <EmojiPicker
                                                                        onSelect={(emoji: string) => {
                                                                            let comment: CommentMessage = Object.assign({}, this.state.currentInputComment);
                                                                            comment.to += emoji;
                                                                            this.setState({currentInputComment: comment});
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
                                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                                <Col span={4}>
                                                    <strong>内容:</strong>
                                                </Col>
                                                <Col span={15}>
                                                    <TextArea
                                                        onChange={(e: any) => {
                                                            const comment = Object.assign({}, this.state.currentInputComment);
                                                            comment.content = e.target.value;
                                                            this.setState({currentInputComment: comment});
                                                        }}
                                                        value={this.state.currentInputComment.content}
                                                    />
                                                </Col>
                                                <Col span={1}>
                                                    <Popover
                                                        trigger={"click"}
                                                        content={
                                                            <EmojiPicker
                                                                onSelect={(emoji: string) => {
                                                                    const comment = Object.assign({}, this.state.currentInputComment);
                                                                    comment.content += emoji;
                                                                    this.setState({currentInputComment: comment});
                                                                }}
                                                            />
                                                        }
                                                        placement={"right"}>
                                                        <Icon type="frown" style={{color: "rgba(0,0,0,.45)"}}/>
                                                    </Popover>
                                                </Col>
                                            </Row>

                                        </Modal>
                                    </Row>
                                </Col>
                            </Row>

                            <Divider dashed={true}/>

                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col span={4}>
                                    <strong>定位:</strong>
                                </Col>
                                <Col span={18}>
                                    <Input
                                        placeholder={"多级地面使用空格分开"}
                                        onChange={(e: any) => {
                                            const message: FriendCircleMessage = Object.assign({}, this.state.currentInputMessage);
                                            message.location = e.target.value.split(" ");

                                            this.setState({
                                                currentInputMessage: message,
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Divider dashed={true}/>

                            <Row type={"flex"} justify={"start"} align={"middle"} gutter={24}>
                                <Col span={4}>
                                    <strong>时间:</strong>
                                </Col>
                                <Col span={10}>
                                    <DatePicker
                                        onChange={(date: moment.Moment | null, dateString: string) => {
                                            if (!date) {
                                                return;
                                            }
                                            const message: FriendCircleMessage = Object.assign({}, this.state.currentInputMessage);
                                            const ts: Date = new Date(message.timestamp.valueOf());
                                            ts.setFullYear(date.year(), date.month(), date.date());
                                            message.timestamp = ts;
                                            this.setState({currentInputMessage: message})
                                        }}
                                    />
                                </Col>
                                <Col span={10}>
                                    <TimePicker
                                        onChange={(time: moment.Moment, timeString: string) => {
                                            const message: FriendCircleMessage = Object.assign({}, this.state.currentInputMessage);
                                            const ts: Date = new Date(message.timestamp.valueOf());
                                            ts.setHours(time.hours(), time.minutes(), time.seconds(), time.milliseconds());
                                            message.timestamp = ts;
                                            console.log(message.timestamp);
                                            this.setState({currentInputMessage: message})
                                        }}
                                    />
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
                                            if (cmsg.message === "" && !cmsg.addition) {
                                                message.error("需要朋友圈内容");
                                                return;
                                            }
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
            </div>
        );
    }

    private static fileBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
}
