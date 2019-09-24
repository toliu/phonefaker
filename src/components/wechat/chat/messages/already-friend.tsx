import * as React from "react";
import {EmojiText} from "../../../../utils";

import {AlreadyFriendMessage} from "./types";
import {MessageWrap} from "./wrap";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class AlreadyFriend extends React.Component <{
    msg: AlreadyFriendMessage,
    OnDelete?: () => void;
}, {}> {
    public render(): React.ReactElement {
        if (this.props.msg.sender === this.props.msg.friend) {
            return <span/>;
        }
        return (
            <MessageWrap OnDelete={this.props.OnDelete}>
                <div datatype={"system"} className={styles.datetime}>
                    <p>
                        你已添加了<EmojiText content={this.props.msg.friend}/>，现在可以开始聊天了。
                    </p>
                </div>
            </MessageWrap>
        );
    }
}
