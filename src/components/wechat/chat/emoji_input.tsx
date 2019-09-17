import * as React from "react";
import {EmojiPicker} from "../../../utils";

import {InputPanel} from "./bottom-panel";


interface EmojiInputProps {
    onBack: () => void;
    onSelect: (em: string) => void;
}

export class EmojiInput extends React.Component<EmojiInputProps, {}> {
    public render(): React.ReactElement {
        return (
            <InputPanel onBack={this.props.onBack}>
                <EmojiPicker onSelect={this.props.onSelect}/>
            </InputPanel>
        );
    }

}
