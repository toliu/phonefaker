import * as React from "react";
import {WechatChat} from "../../components/wechat/chat/chat";
import {MessageTypes} from "../../components/wechat/chat/messages/types";

import {BuildHTMLTitle} from "../../utils";

import styles from "../../assets/css/wechat-chat-page.module.css";

import defaultAvatar1 from "../../assets/img/wechat-default-avatar1.jpg";
import defaultAvatar2 from "../../assets/img/wechat-default-avatar2.jpg";

interface UserInfo {
    name: string;
    avatar: string;
}

interface PageStats {
    user: UserInfo;
    chatter: UserInfo;
    messages: MessageTypes[];
}

export class WechatChatPage extends React.Component<{}, PageStats> {
    private readonly defaultUserName = "时光 [heart]";
    private readonly defaultChatterName = "马化腾";
    private readonly defaultUserAvatar = defaultAvatar1;
    private readonly defaultChatterAvatar = defaultAvatar2;

    constructor(props: any) {
        super(props);
        this.newMessageSender = this.newMessageSender.bind(this);
        this.onMessageDelete = this.onMessageDelete.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setChatter = this.setChatter.bind(this);

        this.state = {
            messages: [],
            user: {name: this.defaultUserName, avatar: this.defaultUserAvatar},
            chatter: {name: this.defaultChatterName, avatar: this.defaultChatterAvatar},
        };
    }

    public componentDidMount() {
        document.title = BuildHTMLTitle(["微信", "聊天制作"])
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.container}>
                <ChatController
                    formOrder={0}
                    newMessageSender={this.newMessageSender}
                    onDelete={this.onMessageDelete}
                    messages={this.state.messages}
                    user={this.state.user}
                    chatter={this.state.chatter}
                    setUser={this.setUser}
                    setChatter={this.setChatter}
                />
                <ChatController
                    formOrder={2}
                    newMessageSender={this.newMessageSender}
                    onDelete={this.onMessageDelete}
                    messages={this.state.messages}
                    user={this.state.chatter}
                    chatter={this.state.user}
                    setUser={this.setChatter}
                    setChatter={this.setUser}
                />
            </div>
        );
    }

    private newMessageSender(msg: MessageTypes): void {
        const msgs: MessageTypes[] = this.state.messages.slice(0);
        msgs.push(msg);
        this.setState({messages: msgs})
    }

    private onMessageDelete(index: number): void {
        const msgs: MessageTypes[] = this.state.messages.slice(0);
        msgs.splice(index, 1);
        this.setState({messages: msgs})
    }

    private setUser(ui: UserInfo) {
        const message: MessageTypes[] = this.state.messages.slice(0).map((msg: MessageTypes) => {
            switch (msg.kind) {
                case "text":
                case "voice":
                case "redPackage":
                case "exchange":
                case "image":
                    if (msg.name === this.state.user.name || msg.avatar === this.state.user.avatar) {
                        const nm = Object.assign({}, msg);
                        nm.name = ui.name;
                        nm.avatar = ui.avatar;
                        return nm;
                    }
            }
            return msg;
        });
        this.setState({user: ui, messages: message})
    }

    private setChatter(ui: UserInfo) {
        const message: MessageTypes[] = this.state.messages.slice(0).map((msg: MessageTypes) => {
            switch (msg.kind) {
                case "text":
                case "voice":
                case "redPackage":
                case "exchange":
                case "image":
                    if (msg.name === this.state.chatter.name || msg.avatar === this.state.chatter.avatar) {
                        const nm = Object.assign({}, msg);
                        nm.name = ui.name;
                        nm.avatar = ui.avatar;
                        return nm;
                    }
            }
            return msg;
        });
        this.setState({chatter: ui, messages: message})
    }
}

interface ChatControllerProps {
    formOrder: 0 | 2;
    newMessageSender: (msg: MessageTypes) => void;
    onDelete: (index: number) => void;
    messages: MessageTypes[];
    user: UserInfo;
    chatter: UserInfo;
    setUser: (ui: UserInfo) => void;
    setChatter: (ui: UserInfo) => void;
}

interface ChatControllerStats {
    background?: string;
}

class ChatController extends React.Component<ChatControllerProps, ChatControllerStats> {
    constructor(props: ChatControllerProps) {
        super(props);
        this.state = {};
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.controller}>
                <div style={{order: this.props.formOrder}}>
                    form
                </div>
                <div style={{order: 1}}>
                    <WechatChat chatterName={this.props.chatter.name} chatterAvatar={this.props.chatter.avatar} userName={this.props.user.name} userAvatar={this.props.user.avatar} messages={this.props.messages} background={this.state.background} onDelete={this.props.onDelete}/>
                </div>
            </div>
        );
    }
}
