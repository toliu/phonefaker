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

    constructor(props: any) {
        super(props);
        this.newMessageSender = this.newMessageSender.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);

        this.avatarUploadRef = React.createRef<HTMLInputElement>();

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
                                <input
                                    id={"user-avatar"}
                                    type={"file"}
                                    accept={"image/*"}
                                    style={{display: "none"}}
                                    onChange={this.uploadAvatar()}
                                />
                            </span>
                            <div>
                                name
                            </div>
                        </div>
                        <FixedChat
                            user={{
                                name: this.state.userName,
                                avatar: this.state.userAvatar,
                            }}
                            otherUser={{
                                name: this.state.receiverName,
                                avatar: this.state.receiverAvatar,
                            }}
                            messages={this.state.messages}
                            sender={this.newMessageSender(true)}
                        />


                    </div>
                </div>

                <div className={styles.transport}>
                    {this.state.transports}
                </div>

                <div className={styles.receiver}>
                    <div className={styles.phone}>
                        <FixedChat
                            user={{
                                name: this.state.receiverName,
                                avatar: this.state.receiverAvatar,
                            }}
                            otherUser={{
                                name: this.state.userName, avatar:
                                this.state.userAvatar,
                            }}
                            messages={this.state.messages}
                            sender={this.newMessageSender(false)}
                        />
                    </div>
                    <div className={styles.form}>
                        <span>
                            <label htmlFor={"receiver-avatar"}>
                                <img src={this.state.receiverAvatar} alt={"头像"}/>
                            </label>
                            <input
                                id={"receiver-avatar"}
                                type={"file"}
                                accept={"image/*"}
                                style={{display: "none"}}
                                onChange={this.uploadAvatar(true)}
                            />
                            </span>
                        <div>
                            name
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
            receiver ?
                this.setState({receiverAvatar: nUrl, messages: nmsg}) :
                this.setState({userAvatar: nUrl, messages: nmsg})
        }
    }
}
