import * as React from "react";

import {Mine, Other} from "./message";

import styles from "./assets/css/voice.module.css";
import voicePicture from "./assets/img/rec-record.png";

interface VoiceProps {
    mine?: boolean;
    avatarURL?: string;
    vLength?: number;
    onDelete?: () => void;
}

export class Voice extends React.Component<VoiceProps, {}> {
    public render(): React.ReactElement {
        let vLength: number = this.props.vLength || 0;
        if (vLength > 60) {
            vLength = 60;
        } else if (vLength < 1) {
            vLength = 1;
        }

        const width = 130 * (vLength / 60);

        if (this.props.mine) {
            return (
                <Mine avatarURL={this.props.avatarURL} onDelete={this.props.onDelete}>
                    <div className={styles["voice-send"]}>
                        <span style={{width: width}}>{vLength}''</span>
                        <img src={voicePicture} alt={"voice"}/>
                    </div>
                </Mine>
            );
        }

        return (
            <Other avatarURL={this.props.avatarURL} onDelete={this.props.onDelete}>
                <div className={styles["voice-receive"]}>
                    <img src={voicePicture} alt={"voice"}/>
                    <span style={{width: width}}>{vLength}''</span>
                </div>
            </Other>
        );
    }

}
