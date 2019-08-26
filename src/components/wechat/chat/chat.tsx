import * as React from "react";

import {Phone} from "../../phone/phone";
import {DateTime} from "./messages/date";
import {Image} from "./messages/image";
import {Text} from "./messages/text";

import styles from "./assets/css/chat.module.css"

export interface message {
    // common
    mine?: boolean;
    avatarURL?: string;

    // text message
    isText?: boolean;
    content?: string;

    // image message
    isImage?: boolean;
    imagePath?: string;

    // date message
    isDate?: boolean;
    date?: Date;
}

interface ChatProps {
    user?: string;
    messages: message[];
}

export class Chat extends React.Component<ChatProps, {}> {
    private chatBody: any;

    componentDidMount() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    public render(): React.ReactElement {
        let chatName = this.props.user;
        if (!chatName) {
            chatName = "时光"
        }
        return (
            <Phone>
                <div className={styles.header}>
                    <span className={styles["back-icon"]}/>
                    <span className={styles["chat-name"]}>{chatName}</span>
                    <span className={styles.profile}/>
                </div>
                <div className={styles.body} ref={(chatBody) => this.chatBody = chatBody}>
                    {this.props.messages.map((msg: message) => {
                        if (!msg.mine) {
                            msg.mine = false;
                        }
                        if (msg.isText) {
                            if (!msg.content) {
                                msg.content = "Nothing"
                            }
                            return <Text mine={msg.mine} content={msg.content} avatarURL={msg.avatarURL}/>;
                        } else if (msg.isImage) {
                            if (!msg.imagePath) {
                                msg.imagePath = "data:image/jpeg;base64,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"
                            }
                            return <Image mine={msg.mine} imagePath={msg.imagePath} avatarURL={msg.avatarURL}/>
                        } else if (msg.isDate) {
                            return <DateTime date={msg.date}/>
                        }
                        return <Text mine={true} content={"Nothing"}/>
                    })}
                </div>
            </Phone>
        );
    }
}