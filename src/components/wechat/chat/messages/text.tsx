import * as React from "react";
import {Emoji} from "emoji-mart";

import {Message} from "./msg";

import styles from "./assets/css/text.module.css";

interface TextProps {
    avatarURL: string;
    onDelete: () => void;
    content: string;
}

class InlineEmoji extends React.Component<{ ID: string }, {}> {
    public render(): React.ReactElement {
        return (
            <span className={styles.emoji}>
                <Emoji size={16} forceSize={true} emoji={`:${this.props.ID}:`}/>
            </span>
        );
    }
}

export class MineText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        let emojiID: string = "";
        let emojiTrack: boolean = false;
        let str: string = "";
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {Array.from(this.props.content).map((char, index) => {
                            if (char === "[") {
                                emojiTrack = true;
                                const rt = <span>{str}</span>;
                                str = "";
                                return rt;
                            } else if (char === "]") {
                                emojiTrack = false;
                                const el = <InlineEmoji ID={emojiID}/>;
                                emojiID = "";
                                return el;
                            }
                            if (emojiTrack) {
                                emojiID += char;
                            } else {
                                str += char;
                            }
                            if (index === this.props.content.length - 1) {
                                return <span>{str}</span>
                            }
                            return "";
                        })}
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        let emojiID: string = "";
        let emojiTrack: boolean = false;
        let str: string = "";
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img className={styles.avatar} src={this.props.avatarURL} alt={"头像"}/>
                    <div className={styles.content}>
                        {Array.from(this.props.content).map((char, index) => {
                            if (char === "[") {
                                emojiTrack = true;
                                const rt = <span>{str}</span>;
                                str = "";
                                return rt;
                            } else if (char === "]") {
                                emojiTrack = false;
                                const el = <InlineEmoji ID={emojiID}/>;
                                emojiID = "";
                                return el;
                            }
                            if (emojiTrack) {
                                emojiID += char;
                            } else {
                                str += char;
                            }
                            if (index === this.props.content.length - 1) {
                                return <span>{str}</span>
                            }
                            return "";
                        })}
                    </div>
                </div>
            </Message>
        );
    }
}