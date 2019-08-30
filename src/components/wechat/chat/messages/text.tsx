import * as React from "react";

import {Message} from "./msg";

import styles from "./assets/css/text.module.css";

interface TextProps {
    avatarURL: string;
    content: string;
    onDelete?: () => void;
}

export class MineText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {this.props.content}
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message>
                <div className={styles.other}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {this.props.content}
                    </div>
                </div>
            </Message>
        );
    }
}