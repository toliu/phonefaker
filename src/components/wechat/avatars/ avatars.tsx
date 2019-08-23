import * as React from "react";

import defaultAvatar from "./assets/img/default_avatar.png";

import styles from "./assets/css/avatar.module.css"

type avatarSize = "small" | "normal" | "large";

interface AvatarProps {
    url?: string;
    size: avatarSize;
}

export class Avatar extends React.Component<AvatarProps, {}> {
    public render(): React.ReactElement {
        let src: string;
        if (this.props.url) {
            src = this.props.url;
        } else {
            src = defaultAvatar;
        }

        let className: string;
        switch (this.props.size) {
            case "small":
                className = styles.small;
                break;
            case "large":
                className = styles.large;
                break;
            default:
                className = styles.normal;
        }

        return (
            <img src={src} className={styles.avatar + " " + className} alt={"图片加载失败"}/>
        );
    }
}
