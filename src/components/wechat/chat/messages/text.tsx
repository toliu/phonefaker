import * as React from "react";
import {EmojiText} from "../../../../utils";

import {TextMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Text extends React.Component<{
    msg: TextMessage;
}, {}> {
    public render(): React.ReactElement {
        if (this.props.msg.rejected && !this.props.msg.mine) {
            return <span/>;
        }
        return (
            <div className={styles.message} style={{justifyContent: this.props.msg.mine ? "flex-end" : "flex-start"}}>
                <div className={styles.avatar}>
                    <img src={this.props.msg.avatar} alt={"avatar"}/>
                </div>
                <div datatype={"message"} className={styles.text} style={{
                    order: this.props.msg.mine ? 0 : 2,
                    backgroundColor: this.props.msg.mine ? "#95EC69" : "#FFF",
                }}>
                    <EmojiText content={this.props.msg.content}/>
                    <div className={this.props.msg.mine ? styles.mine : styles.chatter}/>
                    <div className={styles.reject} style={{
                        display: this.props.msg.rejected ? "block" : "none",
                    }}/>
                </div>
            </div>
        );
    }

}
