import * as React from "react";
import {EmojiText} from "../../../../utils";

import {RedPackageReceivedMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";
import {MessageWrap} from "./wrap";

export class RedPackageReceived extends React.Component <{
    msg: RedPackageReceivedMessage,
}, {}> {
    public render(): React.ReactElement {
        let content: string = "你领取了" + this.props.msg.sender + "的";
        if (this.props.msg.sender === this.props.msg.user) {
            content = this.props.msg.friend + "领取了你的";
        }

        return (
            <MessageWrap>
                <div datatype={"system"} style={{display: "flex", justifyContent: "center"}}>
                    <p className={styles["package-received"]}>
                        <span datatype={"icon"}/>
                        <span><EmojiText content={content}/><span style={{color: "rgba(255,36,0, 0.9)"}}>红包</span></span>
                    </p>
                </div>
            </MessageWrap>
        );
    }

}
