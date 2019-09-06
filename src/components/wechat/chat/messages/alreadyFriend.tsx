import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/msg.module.css";

interface AlreadyFriendProps {
    onDelete: () => void;
    who: string;
}

export class AlreadyFriend extends React.Component<AlreadyFriendProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete} isSystem={true}>
                <span className={styles.already}>你已添加了{this.props.who}，现在可以开始聊天了</span>
            </Message>
        );
    }

}
