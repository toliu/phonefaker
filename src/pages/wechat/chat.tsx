import * as React from "react";
import {FixedChat} from "../../components/wechat/chat/fixedChat";

import {Message} from "../../components/wechat/chat/messages";

import default_avatar from "./assets/img/xuwei_avatar.jpg";

import styles from "./assets/css/chat.module.css";

interface ChatStats {
    userName: string;
    userAvatar?: string;
    receiverName: string;
    receiverAvatar?: string;
    messages: Message[];
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
                            sender={this.newMessageSender}
                        />
                    </div>
                </div>

                <div className={styles.transport}>
                    transport
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
                            sender={this.newMessageSender}
                        />
                    </div>
                    <div className={styles.form}>
                        form
                    </div>
                </div>
            </div>
        );
    }

    private newMessageSender(messages: Message[]) {
        this.setState({messages: messages});
    }
}
