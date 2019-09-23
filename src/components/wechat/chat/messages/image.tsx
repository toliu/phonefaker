import * as React from "react";

import {ImageMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Image extends React.Component<{
    msg: ImageMessage;
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
                <div datatype={"message"} className={styles.image} style={{order: this.props.msg.mine ? 0 : 2}}>
                    <img src={this.props.msg.src} alt={"图片"}/>
                    <div className={styles.reject} style={{display: this.props.msg.rejected ? "block" : "none"}}/>
                </div>
            </div>
        );
    }
}
