import * as React from "react";

import {FixedChat} from "../../components/wechat/chat/fixedChat";
import {Message} from "../../components/wechat/chat/messages";
import {Transport} from "../../components/transport";

import default_avatar from "./assets/img/xuwei_avatar.jpg";
import default_li_avatar from "./assets/img/liyanliang_avatar.jpg";

import styles from "./assets/css/chat.module.css";

interface ChatStats {
    userName: string;
    userAvatar: string;
    receiverName: string;
    receiverAvatar: string;
    messages: Message[];
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
            userName: "许巍",
            userAvatar: default_avatar,
            receiverName: "李延亮",
            receiverAvatar: default_li_avatar,
            messages: [],
            transports: []
        }
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.chat}>
                <div className={styles.user}>
                    <div className={styles.phone}>
                        <div className={styles.form}>
                            <span>
                                <label htmlFor={"user-avatar"}>
                                    <img src={this.state.userAvatar} alt={"头像"}/>
                                </label>
                                <input id={"user-avatar"} type={"file"} accept={"image/*"} style={{display: "none"}} onChange={this.uploadAvatar()}/>
                            </span>
                            <div className={styles.name}>
                                <label>修改用户名:</label>
                                <input type={"text"} placeholder={this.state.userName} ref={this.userNameInputRef} onKeyUp={this.modifyUserName()}/>
                                <input type={"button"} value={"修改"} onClick={this.modifyUserName()}/>
                            </div>
                        </div>
                        <FixedChat userName={this.state.userName} userAvatar={this.state.userAvatar} otherUserName={this.state.receiverName} otherUserAvatar={this.state.receiverAvatar} messages={this.state.messages} sender={this.newMessageSender(true)}/>
                    </div>
                </div>

                <div className={styles.transport}>
                    {this.state.transports}
                </div>

                <div className={styles.receiver}>
                    <div className={styles.phone}>
                        <FixedChat userName={this.state.receiverName} userAvatar={this.state.receiverAvatar} otherUserName={this.state.userName} otherUserAvatar={this.state.userAvatar} messages={this.state.messages} sender={this.newMessageSender(false)}/>
                    </div>
                    <div className={styles.form}>
                        <span>
                            <label htmlFor={"receiver-avatar"}>
                                <img src={this.state.receiverAvatar} alt={"头像"}/>
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
        );
    }

    private newMessageSender(left: boolean): (messages: Message[]) => void {
        return (messages: Message[]) => {
            let transports = this.state.transports;
            transports.push(<Transport toRight={left}/>);
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
