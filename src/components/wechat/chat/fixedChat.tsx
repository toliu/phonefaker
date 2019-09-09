import * as React from "react";

import {AdditionInput} from "./addition-input";
import {EmojiInput} from "./emoji_input";
import {AlreadyFriend} from "./messages/alreadyFriend";
import {DateMessage} from "./messages/date";
import {MineExchange, OtherExchange} from "./messages/exchange";
import {FriendRequire} from "./messages/friendRequire";
import {MineRedPackage, OtherRedPackage, RedPackageReceived} from "./messages/redPackage";
import {VoiceInput} from "./voice_input";
import {MessageType} from "./messages";
import {MineText, OtherText} from "./messages/text";
import {MineVoice, OtherVoice} from "./messages/voice";
import {FixedPhone, PhoneHelpList} from "../../phone/fixedphone";

import styles from "../../../assets/css/fixedchat.module.css";

enum inputType {
    voice = "voice",
    emoji = "emoji",
    addition = "addition",
}

interface ChatProps {
    userName: string;
    userAvatar: string;
    otherUserName: string;
    otherUserAvatar: string;
    sender?: (m: MessageType[]) => void;
    messages?: MessageType[];
}

interface ChatStats {
    currentInputText: string;
    bottomInput?: inputType;
    messages: MessageType[];
    backgroundSrc: string;
}

export const ChatHelpList: string[] = [
    ...PhoneHelpList,
    "*********微信*********",
    "点击语言发送语言信息",
    "输入框内敲回车/Ctrl发送正常/拒绝接受文本信息",
    "点击Emoji往输入框追加表情包",
    "点击+号发送更多类型消息",
    "---------语音----------",
    "点击按钮切换语言已读/未读",
    "---------更多----------",
    "时间: 添加一条时间戳系统消息",
    "好友: 添加一条你已添加XX的系统消息",
    "换背景: 更换当前聊天背景",
    "发红包: 发送一个红包信息，可以设置红包内文字内容"
];

export class FixedChat extends React.Component<ChatProps, ChatStats> {
    private bodyRef: any;
    private textInputRef: any;

    constructor(props: ChatProps) {
        super(props);

        this.getControllerPanel = this.getControllerPanel.bind(this);
        this.getControllerInput = this.getControllerInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.inputText = this.inputText.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);

        this.state = {
            bottomInput: undefined,
            currentInputText: "",
            messages: this.props.messages ? this.props.messages : [],
            backgroundSrc: "",
        }
    }

    public componentDidUpdate() {
        setTimeout(() => {
            this.bodyRef.scrollTop = this.bodyRef.scrollHeight;
        }, 220)
    }

    public render(): React.ReactElement {
        const chatName: string = this.props.otherUserName;
        const bodyClassName: string = this.state.bottomInput ? styles.body : styles["body-no-input"];

        return (
            <FixedPhone controllerPanel={this.getControllerPanel()} controllerInput={this.getControllerInput()}>
                <div className={styles.header}>
                    <div className={styles.back}>
                    </div>
                    <div className={styles.name}>
                        {chatName}
                    </div>
                    <div className={styles.profile}>
                    </div>
                </div>
                <div
                    className={bodyClassName} ref={(e) => this.bodyRef = e}
                    style={{
                        backgroundImage: "url(" + this.state.backgroundSrc + ")"
                    }}
                >
                    {this.state.messages.map((msg: MessageType, index: number) => {
                        const od = this.deleteMessage(index);
                        switch (msg.kind) {
                            case "text":
                                if (msg.user === this.props.userName) {
                                    let msgs: any[] = [<MineText avatarURL={msg.avatar} key={index} onDelete={od} content={msg.content} unread={msg.unread}/>];
                                    if (msg.unread) {
                                        msgs.push(<FriendRequire who={this.props.otherUserName} onDelete={od} key={index + "_unread"}/>)
                                    }
                                    return msgs;
                                } else {
                                    return <OtherText avatarURL={msg.avatar} key={index} onDelete={od} content={msg.content} unread={msg.unread}/>;
                                }
                            case "voice":
                                return msg.user === this.props.userName ?
                                    <MineVoice avatarURL={msg.avatar}
                                               length={msg.voice}
                                               key={index}
                                               unread={msg.unread}
                                               onDelete={od}/> :
                                    <OtherVoice avatarURL={msg.avatar}
                                                length={msg.voice}
                                                key={index}
                                                unread={msg.unread}
                                                onDelete={od}/>;
                            case "redPackage":
                                return msg.user === this.props.userName ?
                                    <MineRedPackage avatarURL={msg.avatar}
                                                    key={index}
                                                    unread={msg.unread}
                                                    title={msg.title}
                                                    onDelete={od}/>
                                    : <OtherRedPackage avatarURL={msg.avatar}
                                                       key={index}
                                                       unread={msg.unread}
                                                       title={msg.title}
                                                       onDelete={od}/>;
                            case "redPackageReceived":
                                return msg.who === this.props.otherUserName ?
                                    <RedPackageReceived odDelete={od} who={msg.who}/>
                                    : "";


                            case "date":
                                return <DateMessage onDelete={od} time={msg.time}/>;
                            case "alreadyFriend":
                                return <AlreadyFriend onDelete={od} who={this.props.otherUserName}/>;
                            case "exchange":
                                return msg.user === this.props.userName ?
                                    <MineExchange onDelete={od} avatar={msg.avatar} money={msg.money} title={msg.title} received={!msg.unread}/> :
                                    <OtherExchange onDelete={od} avatar={msg.avatar} money={msg.money} title={msg.title} received={!msg.unread}/>;
                            default:
                                return <MineText avatarURL={this.props.userAvatar} onDelete={od} content={"未知类型"} unread={false}/>;
                        }
                    })}
                </div>
            </FixedPhone>
        );
    }

    private getControllerPanel(): React.ReactElement {
        return (
            <div className={styles.panel}>
                <div className={styles.voice} onClick={() => this.setState({bottomInput: inputType.voice})}>

                </div>
                <input className={styles.input} type={"text"} ref={(e) => this.textInputRef = e} autoFocus={true}
                       onChange={this.inputText} onKeyUp={this.inputText} value={this.state.currentInputText}
                />
                <div className={styles.emoji} onClick={() => this.setState({bottomInput: inputType.emoji})}>

                </div>

                <div className={styles.addition} onClick={() => this.setState({bottomInput: inputType.addition})}>

                </div>
            </div>
        );
    }

    private deleteMessage(index: number): () => void {
        return () => {
            const messages = this.state.messages;
            messages.splice(index, 1);
            if (this.props.sender) {
                this.props.sender(messages);
            }
            this.setState({messages: messages})
        }
    }

    private sendMessage(msg: MessageType) {
        const messages = this.state.messages;
        messages.push(msg);
        if (this.props.sender) {
            this.props.sender(messages);
        }
        this.setState({
                currentInputText: "",
                messages: messages,
            }
        )
    }

    private inputText(e: any) {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            this.textInputRef.value = "";
            const text: string = this.state.currentInputText.trim();
            if (text) {
                this.sendMessage({
                    kind: "text",
                    user: this.props.userName,
                    avatar: this.props.userAvatar,
                    content: text,
                    unread: false,
                });
            }
        } else if (e.keyCode === 17) {
            this.textInputRef.value = "";
            const text: string = this.state.currentInputText.trim();
            if (text) {
                this.sendMessage({
                    kind: "text",
                    user: this.props.userName,
                    avatar: this.props.userAvatar,
                    content: text,
                    unread: true,
                });
            }
        } else if (e.target) {
            this.setState({
                currentInputText: e.target.value
            });
        }
    }

    private getControllerInput(): React.ReactElement | void {
        const back = () => {
            this.setState({bottomInput: undefined})
        };

        switch (this.state.bottomInput) {
            case inputType.voice:
                return <VoiceInput
                    onBack={back}
                    onSubmit={(v: number, unread: boolean) => {
                        this.sendMessage({
                            kind: "voice",
                            user: this.props.userName,
                            avatar: this.props.userAvatar,
                            voice: v,
                            unread: unread,
                        })
                    }}/>;
            case inputType.emoji:
                return <EmojiInput
                    onBack={back}
                    onSelect={(e: string) => {
                        this.setState({currentInputText: this.state.currentInputText + e})
                    }}
                />;
            case inputType.addition:
                return <AdditionInput
                    onBack={back}
                    selectTime={(t: Date) => {
                        this.sendMessage({kind: "date", time: t})
                    }}
                    alreadyFriend={() => {
                        this.sendMessage({kind: "alreadyFriend", who: this.props.otherUserName})
                    }}
                    backgroundImage={(src: string) => {
                        this.setState({
                            backgroundSrc: src
                        })
                    }}
                    sendRedPackage={(title: string) => {
                        this.sendMessage({
                            kind: "redPackage",
                            user: this.props.userName,
                            avatar: this.props.userAvatar,
                            title: title,
                            unread: false,
                        })
                    }}
                    receiveRedPackage={() => {
                        this.sendMessage({
                            kind: "redPackageReceived",
                            who: this.props.userName,
                        })
                    }}
                    sendExchange={(money: number, content: string, received: boolean) => {
                        this.sendMessage({
                            kind: "exchange", user: this.props.userName, avatar: this.props.userAvatar,
                            unread: !received, money: money, title: content
                        })
                    }}
                />;
        }
    }
}

