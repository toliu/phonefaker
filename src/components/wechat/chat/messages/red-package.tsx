import * as React from "react";

import {RedPackageMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class RedPackage extends React.Component <{
    msg: RedPackageMessage,
}, {}> {
    public render(): React.ReactElement {
        let title: string = this.props.msg.title;
        if (title.length > 9) {
            title = title.slice(0, 8) + "..."
        }
        return (
            <div className={styles.message} style={{justifyContent: this.props.msg.mine ? "flex-end" : "flex-start"}}>
                <div className={styles.avatar}>
                    <img src={this.props.msg.avatar} alt={"avatar"}/>
                </div>
                <div datatype={"message"} className={styles.package} style={{
                    order: this.props.msg.mine ? 0 : 2,
                    opacity: this.props.msg.unread ? 1 : 0.4,
                }}>
                    <div className={this.props.msg.unread ? styles.close : styles.open} datatype={"icon"}/>
                    <div className={styles.content}>
                        <div style={{
                            lineHeight: this.props.msg.unread ? "30px" : undefined,
                            whiteSpace: "nowrap",
                            color: "rgba(255,255,255,0.8)",
                        }}>
                            {title}
                        </div>
                        <div className={styles.received} style={{display: this.props.msg.unread ? "none" : "block"}}>
                            <p>已领取</p>
                        </div>
                    </div>
                    <div className={styles.label}>
                        <p>微信红包</p>
                    </div>
                    <div className={this.props.msg.mine ? styles.mine : styles.chatter}/>
                </div>
            </div>
        );
    }
}
