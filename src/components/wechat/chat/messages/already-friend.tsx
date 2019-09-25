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
        let name: string = this.props.msg.friend;
        if (!this.props.msg.mine) {
            name = this.props.msg.sender;
        }
        return (
            <MessageWrap OnDelete={this.props.OnDelete}>
                <div datatype={"system"} className={styles.datetime}>
                    <p>
                        你已添加了<EmojiText content={name}/>，现在可以开始聊天了。
                    </p>
                </div>
            </MessageWrap>
        );
    }
}
