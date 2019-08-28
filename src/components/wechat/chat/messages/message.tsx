import * as React from "react";

import defaultAvatarPicture from "../assets/img/default_avatar.png";
import styles from "../assets/css/message.module.css";

interface Props {
    avatarURL?: string;
    hiddenBackground?: boolean;
    onDelete?: () => void;
}

export class Mine extends React.Component<Props, {}> {
    public render(): React.ReactElement {
        let avatarURL: string;
        if (this.props.avatarURL) {
            avatarURL = this.props.avatarURL;
        } else {
            avatarURL = defaultAvatarPicture;
        }
        let className: string = styles.message;
        let style = {};
        if (!this.props.hiddenBackground) {
            className = className + " " + styles["bubble-right"];
        } else {
            style = {
                backgroundColor: "rgba(0, 0, 0, 0)",
                padding: "0",
            }
        }

        return (
            <div className={styles.mine} style={{clear: "both"}}>
                <img alt={"mine avatar"} src={avatarURL}/>
                <div className={className} style={style} title={"点击删除"} onClick={this.props.onDelete}>
                    {this.props.children}
                </div>
                <div style={{clear: "both"}}>
                </div>
            </div>
        );
    }
}

export class Other extends React.Component<Props, {}> {
    public render(): React.ReactElement {
        let avatarURL: string;
        if (this.props.avatarURL) {
            avatarURL = this.props.avatarURL;
        } else {
            avatarURL = defaultAvatarPicture;
        }

        let className: string = styles.message;
        let style = {};
        if (!this.props.hiddenBackground) {
            className = className + " " + styles["bubble-left"];
        } else {
            style = {
                backgroundColor: "rgba(0, 0, 0, 0)",
                padding: "0",
            }
        }
        return (
            <div className={styles.other}>
                <img alt={"mine avatar"} src={avatarURL}/>
                <div className={className} style={style} title={"点击删除"} onClick={this.props.onDelete}>
                    {this.props.children}
                </div>
                <div style={{clear: "both"}}>
                </div>
            </div>
        );
    }
}