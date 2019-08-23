import * as React from "react";
import {Phone} from "../../phone/phone";
import {Avatar} from "../avatars/ avatars";

import styles from "./assets/css/chat.module.css"

interface ChatProps {
    user?: string;
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
                    <Avatar size={"small"}/> 聊天内容
                </div>
            </Phone>
        );
    }
}