import {Avatar, Button, Col, DatePicker, Divider, Form, Icon, Input, InputNumber, Modal, Popover, Row, Slider, Switch, Tabs, TimePicker, Upload} from "antd";
import * as moment from "moment";
import * as React from "react";

import {WechatChat} from "../../components/wechat/chat/chat";
import {MessageTypes} from "../../components/wechat/chat/messages/types";
import {BuildHTMLTitle, EmojiPicker} from "../../utils";

import styles from "../../assets/css/wechat-chat-page.module.css";

import defaultAvatar1 from "../../assets/img/wechat-default-avatar1.jpg";
import defaultAvatar2 from "../../assets/img/wechat-default-avatar2.jpg";

const {TabPane} = Tabs;

interface UserInfo {
    name: string;
    avatar: string;
}

interface PageStats {
    user: UserInfo;
    chatter: UserInfo;
    messages: MessageTypes[];
}

export class WechatChatPage extends React.Component<{}, PageStats> {
    private readonly defaultUserName = "时光 [heart]";
    private readonly defaultChatterName = "马化腾";
    private readonly defaultUserAvatar = defaultAvatar1;
    private readonly defaultChatterAvatar = defaultAvatar2;

    constructor(props: any) {
        super(props);
        this.newMessageSender = this.newMessageSender.bind(this);
        this.onMessageDelete = this.onMessageDelete.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setChatter = this.setChatter.bind(this);

        this.state = {
            messages: [],
            user: {name: this.defaultUserName, avatar: this.defaultUserAvatar},
            chatter: {name: this.defaultChatterName, avatar: this.defaultChatterAvatar},
        };
    }

    public componentDidMount() {
        document.title = BuildHTMLTitle(["微信", "聊天制作"])
    }

    public render(): React.ReactElement {
        return (
            <div>
                <div className={styles.container}>
                    <ChatController
                        formOrder={0}
                        newMessageSender={this.newMessageSender}
                        onDelete={this.onMessageDelete}
                        messages={this.state.messages}
                        user={this.state.user}
                        chatter={this.state.chatter}
                        setUser={this.setUser}
                    />
                    <ChatController
                        formOrder={2}
                        newMessageSender={this.newMessageSender}
                        onDelete={this.onMessageDelete}
                        messages={this.state.messages}
                        user={this.state.chatter}
                        chatter={this.state.user}
                        setUser={this.setChatter}
                    />
                </div>
                <div className={styles.sample}>
                    <Tabs size={"large"} defaultActiveKey="1">
                        <TabPane tab="搞笑段子" key="1">
                            <div className={styles.panel}>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "有没有那种天上掉钱的工作？", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "有啊！", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "啥工作", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "许愿池里当王八呗！", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    许愿池王八
                                </div>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "我脸油不油?", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "反光，看不清楚", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    我脸油不油
                                </div>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "到你公司楼下了，快递给你放保安亭？", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "别，你直接拿给我就好", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "可是你公司进不去啊", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "我已经在保安亭了", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "保安亭里只有一个保安", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "我就是保安", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    我就是保安
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="微商购物" key="2">
                            <div className={styles.panel}>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "芙蓉王两条", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "嗯", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {kind: "exchange", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: true, money: 300, postscript: "转账"},
                                            {content: "两条600[sweat]", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {kind: "exchange", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false, money: 600, postscript: "转账"},
                                            {kind: "exchange", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false, money: 600, postscript: "已收款"},
                                            {content: "等会发货", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    购物转账
                                </div>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {kind: "datetime", datetime: new Date(2019, 8, 25, 12, 35)},
                                            {kind: "friend", sender: this.state.user.name, user: this.state.user.name, friend: this.state.chatter.name},
                                            {kind: "datetime", datetime: new Date(2019, 8, 25, 12, 36)},
                                            {content: "朋友介绍的[smile]", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "嗯，你先给我转99红包，然后我拉你进群", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {title: "加入代理", kind: "redPackage", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {kind: "package-received", sender: this.state.chatter.name, user: this.state.chatter.name, friend: this.state.user.name,},
                                            {content: "欢迎加入", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    微商代理
                                </div>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {kind: "datetime", datetime: new Date(2019, 8, 25, 12, 35)},
                                            {content: "芙蓉王两条", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "嗯", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {kind: "exchange", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: true, money: 300, postscript: "转账"},
                                            {content: "两条600[sweat]", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {kind: "datetime", datetime: new Date(2019, 8, 25, 12, 36)},
                                            {kind: "exchange", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false, money: 600, postscript: "转账"},
                                            {kind: "exchange", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false, money: 600, postscript: "已收款"},
                                            {content: "好的", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {kind: "datetime", datetime: new Date(2019, 8, 25, 15, 12)},
                                            {content: "发货了吗", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: true, unread: false},
                                            {kind: "reject", user: this.state.user.name, rejectBy: this.state.chatter.name,},
                                            {content: "我操你妈!!!", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: true, unread: false},
                                        ]
                                    })
                                }}>
                                    购物被骗
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="撩人情话" key="3">
                            <div className={styles.panel}>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "你是我见过第二好看的女孩。", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "那第一呢？", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "第一是我女朋友。", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "你不是单身吗？", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "所以你愿意当我女朋友，成为第一好看的女孩吗?", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "[flushed][flushed][flushed]", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    第一好看
                                </div>
                                <div className={styles.item} onClick={() => {
                                    this.setState({
                                        messages: [
                                            {content: "跟你说一个坏消息", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                            {content: "什么坏消息", kind: "text", name: this.state.chatter.name, avatar: this.state.chatter.avatar, rejected: false, unread: false},
                                            {content: "我对你的思想不单纯了", kind: "text", name: this.state.user.name, avatar: this.state.user.avatar, rejected: false, unread: false},
                                        ]
                                    })
                                }}>
                                    思想不单纯
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }

    private newMessageSender(msg: MessageTypes): void {
        const msgs: MessageTypes[] = this.state.messages.slice(0);
        msgs.push(msg);
        this.setState({messages: msgs})
    }

    private onMessageDelete(index: number): void {
        const msgs: MessageTypes[] = this.state.messages.slice(0);
        msgs.splice(index, 1);
        this.setState({messages: msgs})
    }

    private setUser(ui: UserInfo) {
        const message: MessageTypes[] = this.state.messages.slice(0).map((msg: MessageTypes) => {
            switch (msg.kind) {
                case "text":
                case "voice":
                case "redPackage":
                case "exchange":
                case "image":
                    if (msg.name === this.state.user.name || msg.avatar === this.state.user.avatar) {
                        const nm = Object.assign({}, msg);
                        nm.name = ui.name;
                        nm.avatar = ui.avatar;
                        return nm;
                    }
            }
            return msg;
        });
        this.setState({user: ui, messages: message})
    }

    private setChatter(ui: UserInfo) {
        const message: MessageTypes[] = this.state.messages.slice(0).map((msg: MessageTypes) => {
            switch (msg.kind) {
                case "text":
                case "voice":
                case "redPackage":
                case "exchange":
                case "image":
                    if (msg.name === this.state.chatter.name || msg.avatar === this.state.chatter.avatar) {
                        const nm = Object.assign({}, msg);
                        nm.name = ui.name;
                        nm.avatar = ui.avatar;
                        return nm;
                    }
            }
            return msg;
        });
        this.setState({chatter: ui, messages: message})
    }
}

interface ChatControllerProps {
    formOrder: 0 | 2;
    newMessageSender: (msg: MessageTypes) => void;
    onDelete: (index: number) => void;
    messages: MessageTypes[];
    user: UserInfo;
    chatter: UserInfo;
    setUser: (ui: UserInfo) => void;
}

interface ChatControllerStats {
    inputUserName: string;
    inputTextMessage: string;
    inputVoiceLength: number;
    background?: string;
    messageUnread: boolean;
    messageRejected: boolean;

    redPackageModalVisible: boolean;
    redPackageTitle: string;

    exchangeModalVisible: boolean;
    exchangeMoney: number;
    exchangePostscript: string;

    datetimeModalVisible: boolean;
    datetime: Date;
}

class ChatController extends React.Component<ChatControllerProps, ChatControllerStats> {
    constructor(props: ChatControllerProps) {
        super(props);
        this.state = {
            inputUserName: "",
            inputTextMessage: "",
            inputVoiceLength: 10,
            messageUnread: true,
            messageRejected: false,
            redPackageModalVisible: false,
            redPackageTitle: "恭喜发财，大吉大利",
            exchangeModalVisible: false,
            exchangeMoney: 1,
            exchangePostscript: "转账给" + this.props.chatter.name,
            datetimeModalVisible: false,
            datetime: new Date(),
        };
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.controller}>
                <div className={styles.form} style={{
                    order: this.props.formOrder,
                }}>
                    <Form layout={"horizontal"}>
                        <Form.Item label="头像" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Upload
                                style={{cursor: "pointer"}}
                                accept={"image/*"}
                                fileList={[]}
                                onChange={(info) => {
                                    const file: File = info.file.originFileObj as File;
                                    const reader = new FileReader();
                                    reader.addEventListener("load", () => {
                                        const ui: UserInfo = this.props.user;
                                        ui.avatar = reader.result as string;
                                        this.props.setUser(ui);
                                    });
                                    reader.readAsDataURL(file);
                                }}>
                                <Avatar shape="square" size={"large"} src={this.props.user.avatar}/>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="昵称" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Input
                                placeholder={this.props.user.name}
                                value={this.state.inputUserName}
                                onChange={(e: any) => this.setState({inputUserName: e.target.value})}
                                prefix={<Icon type={"user"}/>}
                                suffix={
                                    <Popover content={<EmojiPicker onSelect={(emoji: string) => {
                                        this.setState({inputUserName: this.state.inputUserName + emoji})
                                    }}/>} trigger={"click"} placement={"bottom"}>
                                        <Icon type={"smile"}/>
                                    </Popover>}
                                addonAfter={
                                    <Button type={"link"} size={"small"} onClick={() => {
                                        if (this.state.inputUserName) {
                                            const ui: UserInfo = this.props.user;
                                            ui.name = this.state.inputUserName;
                                            this.props.setUser(ui);
                                            this.setState({inputUserName: ""})
                                        }
                                    }}> 提交 </Button>
                                }
                            />
                        </Form.Item>
                        <Form.Item label="聊天背景" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                            <Upload
                                style={{cursor: "pointer"}}
                                accept={"image/*"}
                                fileList={[]}
                                onChange={(info) => {
                                    const file: File = info.file.originFileObj as File;
                                    const reader = new FileReader();
                                    reader.addEventListener("load", () => {
                                        this.setState({background: reader.result as string})
                                    });
                                    reader.readAsDataURL(file);
                                }}>
                                <Avatar shape="square" size={"large"} icon={"picture"}/>
                            </Upload>
                        </Form.Item>
                        <Divider/>
                        <Row gutter={24} align={"middle"} justify={"start"} type={"flex"}>
                            <Col span={12}>
                                <Form.Item label="标记未读" labelCol={{span: 12}} wrapperCol={{span: 12}}>
                                    <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        defaultChecked={this.state.messageUnread}
                                        onChange={() => this.setState({messageUnread: !this.state.messageUnread})}
                                        title={"标记消息为未读状态，如语言、红包、转账"}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="标记拒收" labelCol={{span: 12}} wrapperCol={{span: 12}}>
                                    <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        defaultChecked={this.state.messageRejected}
                                        onChange={() => this.setState({messageRejected: !this.state.messageRejected})}
                                        title={"标记消息为对方拒绝接收状态，如非好友、黑名单"}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="新消息" labelCol={{span: 5}} wrapperCol={{span: 19}}>
                            <Input
                                value={this.state.inputTextMessage}
                                onChange={(e: any) => this.setState({inputTextMessage: e.target.value})}
                                suffix={
                                    <Popover content={<EmojiPicker onSelect={(emoji: string) => {
                                        this.setState({inputTextMessage: this.state.inputTextMessage + emoji})
                                    }}/>} trigger={"click"} placement={"bottom"}>
                                        <Icon type={"smile"}/>
                                    </Popover>}
                                addonAfter={
                                    <Button type={"link"} size={"small"} onClick={() => {
                                        if (this.state.inputTextMessage) {
                                            const msg: MessageTypes = {
                                                kind: "text",
                                                name: this.props.user.name,
                                                avatar: this.props.user.avatar,
                                                rejected: this.state.messageRejected,
                                                unread: this.state.messageUnread,
                                                content: this.state.inputTextMessage,
                                            };
                                            this.props.newMessageSender(msg);
                                        }
                                    }}> 发送 </Button>
                                }
                            />
                        </Form.Item>
                        <Form.Item label="语音" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Row gutter={24} align={"middle"} justify={"start"} type={"flex"}>
                                <Col span={16}>
                                    <Slider
                                        min={1}
                                        max={60}
                                        defaultValue={10}
                                        onChange={(e: any) => this.setState({inputVoiceLength: e})}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button size={"small"} type={"primary"} onClick={() => {
                                        this.props.newMessageSender({
                                            kind: "voice",
                                            name: this.props.user.name,
                                            avatar: this.props.user.avatar,
                                            rejected: this.state.messageRejected,
                                            unread: this.state.messageUnread,
                                            voice: this.state.inputVoiceLength,
                                        })
                                    }}>
                                        发送
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="图片" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Upload
                                style={{cursor: "pointer"}}
                                accept={"image/*"}
                                fileList={[]}
                                onChange={(info) => {
                                    const file: File = info.file.originFileObj as File;
                                    const reader = new FileReader();
                                    reader.addEventListener("load", () => {
                                        this.props.newMessageSender({
                                            kind: "image",
                                            name: this.props.user.name,
                                            avatar: this.props.user.avatar,
                                            rejected: this.state.messageRejected,
                                            unread: this.state.messageUnread,
                                            src: reader.result as string,
                                        })
                                    });
                                    reader.readAsDataURL(file);
                                }}>
                                <Avatar shape="square" size={"large"} icon={"plus"}/>
                            </Upload>
                        </Form.Item>
                        <div className={styles.addition}>
                            <div className={styles.icon} onClick={() => this.setState({redPackageModalVisible: true})}>
                                <Avatar shape="square" size={"large"} icon={"money-collect"} style={{backgroundColor: "rgba(250,157,59,0.7)"}}/>
                                <p>红包</p>
                            </div>
                            <div className={styles.icon} onClick={() => {
                                this.props.newMessageSender({
                                    kind: "package-received",
                                    sender: this.props.user.name,
                                    user: this.props.user.name,
                                    friend: this.props.chatter.name,
                                })
                            }}>
                                <Avatar shape="square" size={"large"} icon={"money-collect"} style={{backgroundColor: "rgba(250,157,59,0.4)"}}/>
                                <p>收红包</p>
                            </div>
                            <div className={styles.icon} onClick={() => this.setState({exchangeModalVisible: true})}>
                                <Avatar shape="square" size={"large"} icon={"swap"} style={{backgroundColor: "rgba(250,157,59,0.8)"}}/>
                                <p>转账</p>
                            </div>
                            <div className={styles.icon} onClick={() => this.setState({datetimeModalVisible: true})}>
                                <Avatar shape="square" size={"large"} icon={"history"}/>
                                <p>时间戳</p>
                            </div>
                            <div className={styles.icon} onClick={() => {
                                this.props.newMessageSender({
                                    kind: "reject",
                                    user: this.props.user.name,
                                    rejectBy: this.props.chatter.name,
                                })
                            }}>
                                <Avatar shape="square" size={"large"} icon={"exclamation"} style={{backgroundColor: "rgba(255,0,0,0.8)"}}/>
                                <p>拒收</p>
                            </div>
                            <div className={styles.icon} onClick={() => {
                                this.props.newMessageSender({
                                    kind: "friend",
                                    sender: this.props.user.name,
                                    user: this.props.user.name,
                                    friend: this.props.chatter.name,
                                })
                            }}>
                                <Avatar shape="square" size={"large"} icon={"user-add"} style={{backgroundColor: "rgba(130,255,0,0.5)"}}/>
                                <p>好友</p>
                            </div>
                        </div>
                    </Form>
                </div>
                <Modal title={"发送红包"} okText={"发送"} cancelText={"取消"} visible={this.state.redPackageModalVisible}
                       onCancel={() => {
                           this.setState({redPackageModalVisible: false})
                       }}
                       onOk={() => {
                           let title: string = this.state.redPackageTitle;
                           if (!title) {
                               title = "恭喜发财，大吉大利"
                           }
                           this.props.newMessageSender({
                               kind: "redPackage",
                               name: this.props.user.name,
                               avatar: this.props.user.avatar,
                               rejected: this.state.messageRejected,
                               unread: this.state.messageRejected ? true : this.state.messageUnread,
                               title: title,
                           });
                           this.setState({redPackageModalVisible: false, redPackageTitle: title})
                       }}
                >
                    <Form>
                        <Form.Item label="昵称" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Input placeholder={this.state.redPackageTitle} value={this.state.redPackageTitle} onChange={(e: any) => this.setState({redPackageTitle: e.target.value})}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title={"转账"} okText={"转账"} cancelText={"取消"} visible={this.state.exchangeModalVisible}
                       onCancel={() => {
                           this.setState({exchangeModalVisible: false})
                       }}
                       onOk={() => {
                           let postScript: string = this.state.exchangePostscript;
                           if (!postScript) {
                               postScript = "转账给" + this.props.chatter.name;
                           }
                           this.props.newMessageSender({
                               kind: "exchange",
                               name: this.props.user.name,
                               avatar: this.props.user.avatar,
                               rejected: this.state.messageRejected,
                               unread: this.state.messageRejected ? true : this.state.messageUnread,
                               money: this.state.exchangeMoney,
                               postscript: postScript,
                           });
                           this.setState({exchangeModalVisible: false, exchangePostscript: postScript})
                       }}
                >
                    <Form>
                        <Form.Item label="金额" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <InputNumber defaultValue={1} formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value ? value.replace(/￥\s?|(,*)/g, '') : ""} onChange={value => value && this.setState({exchangeMoney: value.valueOf()})}/>
                        </Form.Item>
                        <Form.Item label="备注" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <Input placeholder={this.state.exchangePostscript} value={this.state.exchangePostscript} onChange={(e: any) => this.setState({exchangePostscript: e.target.value})}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title={"添加时间戳系统消息"} okText={"添加"} cancelText={"取消"} visible={this.state.datetimeModalVisible}
                       onCancel={() => this.setState({datetimeModalVisible: false})}
                       onOk={() => {
                           this.props.newMessageSender({
                               kind: "datetime",
                               datetime: this.state.datetime,
                           });
                           this.setState({datetimeModalVisible: false})
                       }}
                >
                    <Form>
                        <Form.Item label="时间" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                            <DatePicker
                                placeholder={"日期"}
                                onChange={(date: moment.Moment | null, ts: string) => {
                                    if (!date) return;
                                    const datetime: Date = new Date(this.state.datetime.valueOf());
                                    datetime.setFullYear(date.year(), date.month(), date.date());
                                    this.setState({datetime: datetime})
                                }}/>
                            <TimePicker
                                placeholder={"时间"}
                                onChange={(time: moment.Moment, ts: string) => {
                                    const datetime: Date = new Date(this.state.datetime.valueOf());
                                    datetime.setHours(time.hours(), time.minutes(), time.seconds())
                                    this.setState({datetime: datetime})
                                }}/>
                        </Form.Item>
                    </Form>
                </Modal>

                <div style={{order: 1}}>
                    <WechatChat chatterName={this.props.chatter.name} chatterAvatar={this.props.chatter.avatar} userName={this.props.user.name} userAvatar={this.props.user.avatar} messages={this.props.messages} background={this.state.background} onDelete={this.props.onDelete}/>
                </div>
            </div>
        );
    }
}
