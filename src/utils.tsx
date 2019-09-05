import {Emoji} from "emoji-mart";
import * as React from "react";

import styles from "./assets/css/utils.module.css";

class InlineEmoji extends React.Component<{ ID: string }, {}> {
    public render(): React.ReactElement {
        return (
            <span className={styles.emoji}>
                <Emoji size={16} forceSize={true} emoji={`:${this.props.ID}:`}/>
            </span>
        );
    }
}

export function ParseContent(content: string): any[] {
    let emojiID: string = "";
    let emojiTrack: boolean = false;
    let str: string = "";
    return Array.from(content).map((char, index) => {
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
        if (index === content.length - 1) {
            return <span>{str}</span>
        }
        return "";
    })
}
