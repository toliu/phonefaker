import * as React from "react";

import {EmojiText} from "../../../utils";

import {IPhone} from "../../phone/phone";

import styles from "../../../assets/css/wechat-chat.module.css";

interface WechatChatProps {
    title: string;
}

export class WechatChat extends React.Component<WechatChatProps, {}> {
    public render(): React.ReactElement {
        return (
            <IPhone>
                <div className={styles.header}>
                    <div className={styles.back}/>
                    <div className={styles.title}>
                        <EmojiText content={this.props.title} emojiSize={16}/>
                    </div>
                    <div className={styles.dot}/>
                </div>
                <div className={styles.body}>
                </div>
                <div className={styles.bottom}>
                </div>
            </IPhone>
        );
    }

}
