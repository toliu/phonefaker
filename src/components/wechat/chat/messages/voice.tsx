import * as React from "react";

import {Message} from "./msg";

import voicePicture from "../../../../assets/img/rec-record.png";

import styles from "../../../../assets/css/voice.module.css";

interface VoiceProps {
    avatarURL: string;
    length: number;
    onDelete: () => void;
    unread: boolean;
}

export class MineVoice extends React.Component<VoiceProps, {}> {
    public render(): React.ReactElement {
        let length: number = this.props.length;
        if (length > 60) {
            length = 60;
        } else if (length < 0) {
            length = 1;
        }
        const width: number = 150 * length / 60;

        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content} style={{width: width}}>
                        <img src={voicePicture} alt="声音" className={styles.voice}/>
                        {length}''
                    </div>
                </div>
            </Message>
        );
    }
}


export class OtherVoice extends React.Component<VoiceProps, {}> {
    public render(): React.ReactElement {
        let length: number = this.props.length;
        if (length > 60) {
            length = 60;
        } else if (length < 0) {
            length = 1;
        }
        const width: number = 150 * length / 60;
        let className: string = styles.content;
        if (this.props.unread) {
            className += " " + styles.unread;
        }

        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={className} style={{width: width}}>
                        <img src={voicePicture} alt="声音" className={styles.voice}/>
                        {length}''
                    </div>
                </div>
            </Message>
        );
    }
}