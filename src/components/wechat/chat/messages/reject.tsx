import * as React from "react";
import {EmojiText} from "../../../../utils";

import {RejectMessage} from "./types";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Reject extends React.Component<{
    msg: RejectMessage,
}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message}>
                <div datatype={"system"}>
                    <p className={styles.reject}>
                        <EmojiText content={this.props.msg.rejectBy}/>
                        开启了朋友验证，你还不是他(她)的朋友。先发送朋友验证请求，对方验证通过后，才能聊天。
                        <span style={{color: "#838bf8"}}>发送朋友验证</span></p>
                </div>
            </div>
        );
    }

}
