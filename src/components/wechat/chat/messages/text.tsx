import * as React from "react";

import {Mine, Other} from "./message";

interface TextProps {
    mine: boolean;
    avatarURL?: string;
    content: string;
}

export class Text extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        if (this.props.mine) {
            return <Mine avatarURL={this.props.avatarURL}>{this.props.content}</Mine>
        }
        return <Other avatarURL={this.props.avatarURL}> {this.props.content} </Other>;
    }
}
