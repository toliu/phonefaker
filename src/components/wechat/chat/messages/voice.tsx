import * as React from "react";

import {VoiceMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Voice extends React.Component<{
    msg: VoiceMessage;
}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message} style={{justifyContent: this.props.msg.mine ? "flex-end" : "flex-start"}}>
                <div className={styles.avatar}>
                    <img src={this.props.msg.avatar} alt={"avatar"}/>
                </div>
                <div datatype={"message"} className={styles.voice} style={{
                    order: this.props.msg.mine ? 0 : 2,
                    backgroundColor: this.props.msg.mine ? "#95EC69" : "#FFF",
                }}>
                    <div className={this.props.msg.mine ? styles.mine : styles.chatter}/>
                </div>
            </div>
        );
    }

}
