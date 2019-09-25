import * as React from "react";

import {AlreadyFriend} from "./already-friend";
import {Datetime} from "./datetime";
import {Exchange} from "./exchange";
import {Image} from "./image";
import {RedPackageReceived} from "./package-received";
import {RedPackage} from "./red-package";
import {Reject} from "./reject";
import {Text} from "./text";
import {Voice} from "./voice";
import {MessageTypes} from "./types";

interface MessagesProps {
    user: string;
    messages: MessageTypes[];
    onDelete?: (index: number) => void;
}

export class Messages extends React.Component<MessagesProps, {}> {
    public render(): React.ReactElement {
        return (
            <div>
                {this.props.messages.map((msg: MessageTypes, index: number) => {
                    let deleteHandler: (() => void) | undefined;
                    if (this.props.onDelete) {
                        deleteHandler = () => {
                            if (this.props.onDelete) {
                                this.props.onDelete(index);
                            }
                        }
                    }
                    switch (msg.kind) {
                        case "text":
                            msg.mine = msg.name === this.props.user;
                            return <Text msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "voice":
                            msg.mine = msg.name === this.props.user;
                            return <Voice msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "redPackage":
                            msg.mine = msg.name === this.props.user;
                            return <RedPackage msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "exchange":
                            msg.mine = msg.name === this.props.user;
                            return <Exchange msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "image":
                            msg.mine = msg.name === this.props.user;
                            return <Image msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "datetime":
                            return <Datetime msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "reject":
                            if (msg.user !== this.props.user) {
                                return null;
                            }
                            return <Reject msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "friend":
                            msg.mine = this.props.user === msg.sender;
                            return <AlreadyFriend msg={msg} key={index} OnDelete={deleteHandler}/>;
                        case "package-received":
                            return <RedPackageReceived msg={msg} key={index} OnDelete={deleteHandler}/>;
                    }
                    return <span key={index} onContextMenu={deleteHandler}>message</span>
                })}
            </div>
        )

    }
}
