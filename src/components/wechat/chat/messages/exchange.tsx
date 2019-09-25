import * as React from "react";
import {EmojiText} from "../../../../utils";

import {ExchangeMessage} from "./types";
import {MessageWrap} from "./wrap";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Exchange extends React.Component<{
    msg: ExchangeMessage;
    OnDelete?: () => void;
}, {}> {
    public render(): React.ReactElement {
        if (this.props.msg.rejected && !this.props.msg.mine) {
            return <span/>;
        }
        let money: string = (Math.floor(this.props.msg.money * 100) + "");
        money = money.slice(0, money.length - 2) + "." + money.slice(money.length - 2);
        let postscript: string = this.props.msg.postscript;
        if (!postscript) {
            postscript = "转账";
        }
        let length: number = 0;
        postscript = postscript.split(/[[|\]]/).map((each: string, index) => {
            if (index % 2 === 0) {
                length += each.length;
                if (length > 11) {
                    return each.slice(0, 10 - length) + "...";
                } else if (length === 11) {
                    return "...";
                } else {
                    return each;
                }
            } else if (length < 11) {
                length += 1;
                return "[" + each + "]";
            }
            return "";
        }).join("");

        return (
            <MessageWrap OnDelete={this.props.OnDelete} style={{justifyContent: this.props.msg.mine ? "flex-end" : "flex-start"}}>
                <div className={styles.avatar}>
                    <img src={this.props.msg.avatar} alt={"avatar"}/>
                </div>
                <div datatype={"message"} className={styles.package} style={{
                    order: this.props.msg.mine ? 0 : 2,
                    opacity: this.props.msg.unread ? 1 : 0.4,
                }}>
                    <div className={this.props.msg.unread ? styles.exchange : styles.ereceived} datatype={"icon"}/>
                    <div className={styles.content} style={{fontFamily: "inherit"}}>
                        <div style={{whiteSpace: "nowrap", color: "rgba(255,255,255,0.8)", fontSize: 15}}>
                            ￥{money}
                        </div>
                        <div className={styles.received} style={{bottom: 0}}>
                            <p style={{fontFamily: "serif", color: "rgba(255,255,255,0.7)", width: "130%"}}><EmojiText content={postscript} emojiSize={12}/></p>
                        </div>
                    </div>
                    <div className={styles.label}>
                        <p>微信转账</p>
                    </div>
                    <div className={this.props.msg.mine ? styles.mine : styles.chatter}/>
                    <div className={styles.reject} style={{
                        display: this.props.msg.rejected ? "block" : "none",
                    }}/>
                </div>
            </MessageWrap>
        );
    }

}
