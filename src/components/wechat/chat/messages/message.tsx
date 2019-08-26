import * as React from "react";

import defaultAvatarPicture from "../assets/img/default_avatar.png";
import styles from "../assets/css/message.module.css";

interface MineProps {
    avatarURL?: string;
}

export class Mine extends React.Component<MineProps, {}> {
    public render(): React.ReactElement {
        let avatarURL: string;
        if (this.props.avatarURL) {
            avatarURL = this.props.avatarURL;
        } else {
            avatarURL = defaultAvatarPicture;
        }
        return (
            <div className={styles.mine}>
                <img alt={"mine avatar"} src={avatarURL}/>
                <div className={styles.message}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

interface OtherProps {
    avatarURL?: string;
}

export class Other extends React.Component<OtherProps, {}> {
    public render(): React.ReactElement {
        let avatarURL: string;
        if (this.props.avatarURL) {
            avatarURL = this.props.avatarURL;
        } else {
            avatarURL = defaultAvatarPicture;
        }
        return (
            <div className={styles.other}>
                <img alt={"mine avatar"} src={avatarURL}/>
                <div className={styles.message}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}