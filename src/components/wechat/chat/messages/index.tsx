import * as React from "react";
import {Datetime} from "./datetime";

import {Exchange} from "./exchange";
import {Image} from "./image";
import {RedPackage} from "./red-package";
import {Reject} from "./reject";
import {Text} from "./text";
import {Voice} from "./voice";

import {MessageTypes} from "./types";

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
                            return <RedPackage msg={msg} key={index}/>;
                        case "exchange":
                            msg.mine = msg.name === this.props.user;
                            return <Exchange msg={msg} key={index}/>;
                        case "image":
                            msg.mine = msg.name === this.props.user;
                            return <Image msg={msg} key={index}/>;
                        case "datetime":
                            return <Datetime msg={msg} key={index}/>;
                        case "reject":
                            if (msg.user !== this.props.user) {
                                return null;
                            }
                            return <Reject msg={msg} key={index}/>;
                    }
                    return <span key={index}>message</span>
                })}
            </div>
        )

    }
}
