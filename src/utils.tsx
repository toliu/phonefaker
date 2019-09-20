import "emoji-mart/css/emoji-mart.css";

import {Emoji, Picker} from "emoji-mart";
import * as React from "react";

interface EmojiTextProps {
    content: string;
    emojiSize?: 14 | 16;
}

export class EmojiText extends React.Component<EmojiTextProps, {}> {

    public render(): React.ReactElement {
        const contentList: string[] = this.props.content.split(/[[|\]]/);
        return (
            <span style={{display: "flex", alignItems: "center"}}>
                {contentList.map((item: string, index: number) => {
                    if (!item) {
                        return null;
                    }
                    const odd: boolean = index % 2 === 0;
                    if (odd) {
                        item = item.replace(" ", "&nbsp;");
                        return <span key={index} dangerouslySetInnerHTML={{__html: item}}/>
                    }
                    return <Emoji
                        key={index}
                        size={this.props.emojiSize ? this.props.emojiSize : 14}
                        forceSize={true}
                        emoji={`:${item}:`}
                    />
                })}
            </span>
        )
    }
}

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
}

export class EmojiPicker extends React.Component<EmojiPickerProps, {}> {
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

export class ArrayLoops {
    private readonly values: any[];

    private currentIndex: number;

    constructor(values: any[], initialIndex?: number) {
        this.next = this.next.bind(this);
        this.random = this.random.bind(this);
        this.currentValue = this.currentValue.bind(this);

        this.values = values;
        this.currentIndex = initialIndex ? initialIndex : 0;
    }

    public currentValue(): any {
        return this.values[this.currentIndex];
    }

    public next(): any {
        const ni: number = this.currentIndex + 1;
        if (ni >= this.values.length) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = ni;
        }
        return this;
    }

    public random(): any {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }
}
