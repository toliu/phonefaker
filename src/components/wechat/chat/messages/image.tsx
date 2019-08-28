import * as React from "react";

import {Mine, Other} from "./message";

import styles from "./assets/css/image.module.css";

interface ImageProps {
    mine: boolean;
    avatarURL?: string;
    onDelete?: () => void;
    imagePath: string;
}

export class Image extends React.Component<ImageProps, {}> {
    public render(): React.ReactElement {
        if (this.props.mine) {
            return (
                <Mine avatarURL={this.props.avatarURL} hiddenBackground={true} onDelete={this.props.onDelete}>
                    <img src={this.props.imagePath} alt={"path"} className={styles["image-right"]}/>
                </Mine>
            );
        }
        return (
            <Other avatarURL={this.props.avatarURL} hiddenBackground={true} onDelete={this.props.onDelete}>
                <img src={this.props.imagePath} alt={"path"} className={styles["image-left"]}/>
            </Other>
        );
    }
}
