import * as React from "react";

import {Mine, Other} from "./message";

interface TextProps {
    mine: boolean;
    avatarURL?: string;
    content: string;
    onDelete?: () => void;
}

export class Text extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        if (this.props.mine) {
            return <Mine avatarURL={this.props.avatarURL} onDelete={this.props.onDelete}>{this.props.content}</Mine>
        }
        return <Other avatarURL={this.props.avatarURL} onDelete={this.props.onDelete}> {this.props.content} </Other>;
    }
}
