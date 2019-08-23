import * as React from "react";
import {Phone} from "../../phone/phone";

import styles from "./assets/css/chat.module.css"

export class Chat extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <Phone>
                <div className={styles.header}>
                    <span className={styles["back-icon"]}/>
                    <span className={styles["chat-name"]}>头部</span>
                    <span className={styles.profile}/>
                </div>
                <div className={styles.body}>
                    聊天内容
                </div>
            </Phone>
        );
    }
}