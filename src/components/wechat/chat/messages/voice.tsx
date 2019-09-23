import * as React from "react";

import {VoiceMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Voice extends React.Component<{
    msg: VoiceMessage;
}, {}> {
    public render(): React.ReactElement {
        if (this.props.msg.rejected && !this.props.msg.mine) {
            return <span/>;
        }
        let voiceLength: number = this.props.msg.voice;
        if (voiceLength > 60) {
            voiceLength = 60;
        } else if (voiceLength < 1) {
            voiceLength = 1;
        }

        // 使用正弦函数计算语音的长度,且最大值为60%
        const length: string = Math.sin(((voiceLength / 60) * 90 * Math.PI) / 180) * 60 + "%";

        return (
            <div className={styles.message} style={{justifyContent: this.props.msg.mine ? "flex-end" : "flex-start"}}>
                <div className={styles.avatar}>
                    <img src={this.props.msg.avatar} alt={"avatar"}/>
                </div>
                <div datatype={"message"} className={styles.voice} style={{
                    order: this.props.msg.mine ? 0 : 2,
                    backgroundColor: this.props.msg.mine ? "#95EC69" : "#FFF",
                    width: length,
                    textAlign: this.props.msg.mine ? "right" : "left",
                }}>
                    <p style={{display: this.props.msg.mine ? "inline-block" : "none"}}>{voiceLength}''</p>
                    <div className={styles.icon} style={{transform: this.props.msg.mine ? "rotate(180deg)" : undefined}}/>
                    <p style={{display: this.props.msg.mine ? "none" : "inline-block"}}>{voiceLength}''</p>
                    <div className={styles.unread} style={{
                        left: this.props.msg.mine ? -15 : undefined,
                        right: this.props.msg.mine ? undefined : -15,
                        display: this.props.msg.rejected ? "none" : this.props.msg.unread ? "block" : "none",
                    }}/>
                    <div className={this.props.msg.mine ? styles.mine : styles.chatter}/>
                    <div className={styles.reject} style={{
                        display: this.props.msg.rejected ? "block" : "none",
                    }}/>
                </div>
            </div>
        );
    }
}
