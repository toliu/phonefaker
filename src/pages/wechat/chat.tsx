import * as React from "react";

import {FixedChat, ChatHelpList} from "../../components/wechat/chat/fixedChat";
import {MessageType} from "../../components/wechat/chat/messages";
import {Sample} from "../../components/sample";
import {Transport} from "../../components/transport";

import default_avatar1 from "../../assets/img/default_avatar1.jpg";
import default_avatar2 from "../../assets/img/default_avatar2.jpg";

import {SampleData} from "../sample";

import styles from "../../assets/css/chat.module.css";

interface ChatStats {
    userName: string;
    userAvatar: string;
    receiverName: string;
    receiverAvatar: string;
    messages: MessageType[];
    transports: React.ReactElement[];
}

export class Chat extends React.Component<{}, ChatStats> {

    private readonly avatarUploadRef: React.RefObject<HTMLInputElement>;
    private readonly userNameInputRef: React.RefObject<HTMLInputElement>;
    private readonly receiverNameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.newMessageSender = this.newMessageSender.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.modifyUserName = this.modifyUserName.bind(this);

        this.avatarUploadRef = React.createRef<HTMLInputElement>();
        this.userNameInputRef = React.createRef<HTMLInputElement>();
        this.receiverNameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            userName: "时光",
            userAvatar: default_avatar1,
            receiverName: "🗢汤圆。б",
            receiverAvatar: default_avatar2,
            messages: [],
            transports: []
        }
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <div className={styles.chat}>
                    <div className={styles.user}>
                        <div className={styles.form}>
                        <span>
                            <label htmlFor={"user-avatar"}>
                                <img src={this.state.userAvatar} alt={"头像"} title={"点击修改"}/>
                            </label>
                            <input id={"user-avatar"} type={"file"} accept={"image/*"} style={{display: "none"}} onChange={this.uploadAvatar()}/>
                        </span>
                            <div className={styles.name}>
                                <label>修改用户名:</label>
                                <input type={"text"} placeholder={this.state.userName} ref={this.userNameInputRef} onKeyUp={this.modifyUserName()}/>
                                <input type={"button"} value={"修改"} onClick={this.modifyUserName()}/>
                            </div>
                        </div>
                        <div className={styles.phone}>
                            <FixedChat
                                userName={this.state.userName}
                                userAvatar={this.state.userAvatar}
                                otherUserName={this.state.receiverName}
                                otherUserAvatar={this.state.receiverAvatar}
                                messages={this.state.messages}
                                sender={this.newMessageSender(true)}
                            />
                        </div>
                    </div>

                    <div className={styles.transport}>
                        <div className={styles.trans}>
                            {this.state.transports}
                        </div>
                        <div className={styles.helper}>
                            <p>使用教程:</p>
                            <ul>
                                {ChatHelpList.map((item: string, index: number) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.receiver}>
                        <div className={styles.phone}>
                            <FixedChat
                                userName={this.state.receiverName}
                                userAvatar={this.state.receiverAvatar}
                                otherUserName={this.state.userName}
                                otherUserAvatar={this.state.userAvatar}
                                messages={this.state.messages}
                                sender={this.newMessageSender(false)}
                            />
                        </div>
                        <div className={styles.form}>
                        <span>
                            <label htmlFor={"receiver-avatar"}>
                                <img src={this.state.receiverAvatar} alt={"头像"} title={"点击修改"}/>
                            </label>
                            <input id={"receiver-avatar"} type={"file"} accept={"image/*"} style={{display: "none"}} onChange={this.uploadAvatar(true)}/>
                        </span>
                            <div className={styles.name}>
                                <label>修改用户名:</label>
                                <input type={"text"} placeholder={this.state.receiverName} ref={this.receiverNameInputRef} onKeyUp={this.modifyUserName(true)}/>
                                <input type={"button"} value={"修改"} onClick={this.modifyUserName(true)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <WeChatSample setMessage={(userName: string,
                                           userAvatar: string,
                                           otherName: string,
                                           otherAvatar: string,
                                           messages: MessageType[]) => {
                    this.setState({
                        userName: userName,
                        userAvatar: userAvatar,
                        receiverName: otherName,
                        receiverAvatar: otherAvatar,
                        messages: messages,
                    })
                }}/>
            </React.Fragment>
        );
    }

    private newMessageSender(left: boolean): (messages: MessageType[]) => void {
        return (messages: MessageType[]) => {
            let transports = this.state.transports;
            transports.push(<Transport toRight={left} key={Math.random() + ""}/>);
            this.setState({
                messages: messages,
                transports: transports,
            });
        }
    }

    private uploadAvatar(receiver?: boolean): (event: any) => void {
        return (event: any) => {
            const files = event.target.files;
            if (!files) return;
            const oriAvatar = receiver ? this.state.receiverAvatar : this.state.userAvatar;
            const nUrl: string = URL.createObjectURL(files[0]);
            let nmsg: any[] = [];
            const messages = this.state.messages;
            for (let msg of messages) {
                switch (msg.kind) {
                    case "text":
                    case "voice":
                        msg.avatar = msg.avatar === oriAvatar ? nUrl : msg.avatar;
                        break;
                    default:
                        break;
                }
                nmsg.push(msg);
            }
            if (receiver) {
                this.setState({receiverAvatar: nUrl, messages: nmsg})
            } else {
                this.setState({userAvatar: nUrl, messages: nmsg})
            }
        }
    }

    private modifyUserName(receiver?: boolean): (event: any) => void {
        return (event: any) => {
            if (event.keyCode && event.keyCode !== 13) {
                return;
            }
            let current: any = receiver ? this.receiverNameInputRef.current : this.userNameInputRef.current;
            if (!current) return;
            const newName = current.value;
            if (this.receiverNameInputRef.current) this.receiverNameInputRef.current.value = "";
            if (this.userNameInputRef.current) this.userNameInputRef.current.value = "";
            if (!newName) return;
            let nmsg: any[] = [];
            const messages = this.state.messages;
            for (let msg of messages) {
                switch (msg.kind) {
                    case "text":
                    case "voice":
                        if (receiver) {
                            msg.user = msg.user === this.state.receiverName ? newName : msg.user
                        } else {
                            msg.user = msg.user === this.state.userName ? newName : msg.user
                        }
                        break;
                    default:
                        break;
                }
                nmsg.push(msg);
            }
            if (receiver) {
                this.setState({receiverName: newName, messages: nmsg})
            } else {
                this.setState({userName: newName, messages: nmsg})
            }
        }
    }
}

type WeChatSampleProps = {
    setMessage: (userName: string, userAvatar: string, otherName: string, otherAvatar: string, messages: MessageType[]) => void;
}

class WeChatSample extends React.Component<WeChatSampleProps, {}> {
    public render(): React.ReactElement {
        const sampleData: any = SampleData.Chat;
        return (
            <Sample tabs={{
                "微商": [
                    {
                        label: "购物",
                        onClick: () => {
                            const msg = sampleData.buy;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                    {
                        label: "招代理",
                        onClick: () => {
                            const msg = sampleData.proxy;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                ],
                "笑话": [
                    {
                        label: "对话一",
                        onClick: () => {
                            const msg = sampleData.joke1;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                    {
                        label: "对话二",
                        onClick: () => {
                            const msg = sampleData.joke2;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                ],
                "撩人情话": [
                    {
                        label: "眼睛好看",
                        onClick: () => {
                            const msg = sampleData.LoveWords1;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                    {
                        label: "喜欢狗吗",
                        onClick: () => {
                            const msg = sampleData.LoveWords2;
                            this.props.setMessage(msg.userName, msg.userAvatar, msg.otherName, msg.otherAvatar, msg.messages)
                        },
                    },
                ],

            }}/>
        );
    }
}
