import "emoji-mart/css/emoji-mart.css";

import * as React from "react";
import {Picker} from "emoji-mart";


interface EmojiInputProps {
    onSelect: (em: string) => void;
}

export class EmojiInput extends React.Component<EmojiInputProps, {}> {
    public render(): React.ReactElement {
        return (
            <Picker
                onSelect={(ed: any) => this.props.onSelect(ed.native)}
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
