import * as React from "react";

import {Message} from "./msg";
import {ParseContent} from "../../../../utils";

import styles from "../../../../assets/css/text.module.css";

interface TextProps {
    avatarURL: string;
    onDelete: () => void;
    content: string;
}

export class MineText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {ParseContent(this.props.content)}
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {ParseContent(this.props.content)}
                    </div>
                </div>
            </Message>
        );
    }
}