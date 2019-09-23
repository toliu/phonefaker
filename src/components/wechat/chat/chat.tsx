import * as React from "react";

import {EmojiText} from "../../../utils";

import {IPhone} from "../../phone/phone";

import styles from "../../../assets/css/wechat-chat.module.css";
import {Messages} from "./messages";
import {MessageTypes} from "./messages/types";

interface WechatChatProps {
    chatterName: string;
    chatterAvatar: string;
    userName: string;
    userAvatar: string;
    messages: MessageTypes[]
}

export class WechatChat extends React.Component<WechatChatProps, {}> {
    public render(): React.ReactElement {
        return (
            <IPhone>
                <div className={styles.header}>
                    <div className={styles.back}/>
                    <div className={styles.title}>
                        <EmojiText content={this.props.chatterName} emojiSize={16}/>
                    </div>
                    <div className={styles.dot}/>
                </div>
                <div className={styles.body}>
                    <Messages user={this.props.userName} messages={this.props.messages}/>
                </div>
                <div className={styles.bottom}>
                </div>
            </IPhone>
        );
    }

}