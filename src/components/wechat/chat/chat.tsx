import * as React from "react";

import {Phone} from "../../phone/phone";
import {Text} from "./messages/text";

import styles from "./assets/css/chat.module.css"

interface message {
    // common
    mine?: boolean;
    avatarURL?: string;

    // text message
    isText?: boolean;
    content?: string;
}

interface ChatProps {
    user?: string;
    messages: message[];
}

export class Chat extends React.Component<ChatProps, {}> {
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
                <div className={styles.body}>
                    {this.props.messages.map((msg: message) => {
                        if (msg.isText) {
                            if (!msg.mine) {
                                msg.mine = false;
                            }
                            if (!msg.content) {
                                msg.content = "Nothing"
                            }
                            return <Text mine={msg.mine} content={msg.content} avatarURL={msg.avatarURL}/>;
                        }
                        return <Text mine={true} content={"Nothing"}/>
                    })}
                </div>
            </Phone>
        );
    }
}