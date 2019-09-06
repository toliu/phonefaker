import {display} from "html2canvas/dist/types/css/property-descriptors/display";
import * as React from "react";

import {Message} from "./msg";
import {ParseContent} from "../../../../utils";

import styles from "../../../../assets/css/text.module.css";

interface TextProps {
    avatarURL: string;
    onDelete: () => void;
    content: string;
    unread: boolean;
}

export class MineText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        let className: string = styles.content;
        let maxWidth: number = 180;
        if (this.props.unread) {
            className += " " + styles.unread;
            maxWidth = 150;
        }

        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={className} style={{maxWidth: maxWidth}}>
                        {ParseContent(this.props.content)}
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        if (this.props.unread) {
            return (
                <div style={{display: "none"}}>
                    not exits message
                </div>
            )
        }
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