import * as React from "react";

import {Message} from "./msg";

interface TextProps {
    mine: boolean;
    avatarURL?: string;
    content: string;
    onDelete?: () => void;
}

export class MineText extends React.Component<TextProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message>
                <img/>
            </Message>
        );
    }
}
