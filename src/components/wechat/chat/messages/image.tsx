import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/wechat_image_message.module.css";

interface ImageProps {
    onDelete: () => void;
    avatarURL: string;
    src: string;
}

export class MineImage extends React.Component<ImageProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <img className={styles.image} src={this.props.src} alt={"图片"}/>
                </div>
            </Message>
        );
    }
}

export class OtherImage extends React.Component<ImageProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <img className={styles.image} src={this.props.src} alt={"图片"}/>
                </div>
            </Message>
        );
    }
}
