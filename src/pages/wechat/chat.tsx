import * as React from "react";

import {FixedChat} from "../../components/wechat/chat/fixedChat";
import {Message} from "../../components/wechat/chat/messages";
import {Transport} from "../../components/transport";

import default_avatar from "./assets/img/xuwei_avatar.jpg";

import styles from "./assets/css/chat.module.css";

interface ChatStats {
    userName: string;
    userAvatar?: string;
    receiverName: string;
    receiverAvatar?: string;
    messages: Message[];
    transports: React.ReactElement[];
}

export class Chat extends React.Component<{}, ChatStats> {

    constructor(props: any) {
        super(props);
        this.newMessageSender = this.newMessageSender.bind(this);


        this.state = {
            userName: "许巍",
            userAvatar: default_avatar,
            receiverName: "李延亮",
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
                            form
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
                        form
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
}
