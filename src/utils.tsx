import "emoji-mart/css/emoji-mart.css";

import {Emoji, Picker} from "emoji-mart";
import * as React from "react";

import styles from "./assets/css/utils.module.css";

class InlineEmoji extends React.Component<{ ID: string }, {}> {
    public render(): React.ReactElement {
        return (
            <span className={styles.emoji}>
                <Emoji size={14} forceSize={true} emoji={`:${this.props.ID}:`}/>
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
            const rt = <span key={index}>{str}</span>;
            str = "";
            return rt;
        } else if (char === "]") {
            emojiTrack = false;
            const el = <InlineEmoji key={index} ID={emojiID}/>;
            emojiID = "";
            return el;
        }
        if (emojiTrack) {
            emojiID += char;
        } else {
            str += char;
        }
        if (index === content.length - 1) {
            return <span key={index}>{str}</span>
        }
        return "";
    })
}


export class EmojiPicker extends React.Component<{
    onSelect: (emoji: string) => void;
}, {}> {
    public render(): React.ReactElement {
        return (
            <Picker
                onSelect={(ed: any) => this.props.onSelect(`[${ed.id}]`)}
                emojiSize={16}
                style={{
                    maxWidth: "100%"
                }}
                i18n={{
                    search: "搜索",
                    notfound: "未找到表情",
                    categories: {
                        search: "搜索结果",
                        recent: "最近使用",
                        people: "人物",
                        nature: "自然",
                        foods: "食物",
                        activity: "生活",
                        places: "风景",
                        objects: "物品",
                        symbols: "符号",
                        flags: "标志",
                        custom: "自定义",
                    },
                }}
            />
        );
    }
}