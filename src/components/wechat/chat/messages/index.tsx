import * as React from "react";
import {RedPackage} from "./red-package";
import {Text} from "./text";

import {MessageTypes} from "./types";
import {Voice} from "./voice";

interface MessagesProps {
    user: string;
    messages: MessageTypes[];
}

export class Messages extends React.Component<MessagesProps, {}> {
    public render(): React.ReactElement {
        return (
            <div>
                {this.props.messages.map((msg: MessageTypes, index: number) => {
                    switch (msg.kind) {
                        case "text":
                            msg.mine = msg.name === this.props.user;
                            return <Text msg={msg} key={index}/>;
                        case "voice":
                            msg.mine = msg.name === this.props.user;
                            return <Voice msg={msg} key={index}/>;
                        case "redPackage":
                            msg.mine = msg.name === this.props.user;
                            return <RedPackage msg={msg} key={index}/>
                    }
                    return <span key={index}>message</span>
                })}
            </div>
        )

    }
}
