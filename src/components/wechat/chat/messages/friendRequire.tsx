import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/msg.module.css";

interface FriendRequireProps {
    who: string;
    onDelete: () => void;
}


export class FriendRequire extends React.Component<FriendRequireProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete} isSystem={true}>
                <span className={styles.friend}>{this.props.who}开启了好友验证，你还不是他(她)好友。请先发送好友验证请求，对方验证后通过，才能聊天。<span className={styles.send}>发送好友验证</span></span>
            </Message>
        );
    }

}
