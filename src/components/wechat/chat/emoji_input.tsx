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
                native={true}
                emojiSize={12}
            />
        );
    }

}
