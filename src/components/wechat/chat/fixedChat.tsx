import * as React from "react";

import {MineText, OtherText} from "./messages/text";
import {FixedPhone} from "../../phone/fixedphone";

import styles from "./assets/css/fixedchat.module.css";

import defaultAvatar from "./assets/img/default_avatar.png";

enum inputType {
    voice = "voice",
    emoji = "emoji",
    addition = "addition",
}

interface ChatProps {
    name?: string;
}

interface ChatStats {
    bottomInput?: inputType;
}

export class FixedChat extends React.Component<ChatProps, ChatStats> {
    private readonly defaultChatName: string;
    private bodyRef: any;

    constructor(props: ChatProps) {
        super(props);

        this.getControllerPanel = this.getControllerPanel.bind(this);
        this.getControllerInput = this.getControllerInput.bind(this);

        this.defaultChatName = "时光";

        this.state = {
            bottomInput: undefined,
        }
    }

    public componentDidUpdate() {
        this.bodyRef.scrollTop = this.bodyRef.scrollHeight;
    }

    public render(): React.ReactElement {
        const chatName: string = this.props.name ? this.props.name : this.defaultChatName;
        const bodyClassName: string = this.state.bottomInput ? styles.body : styles["body-no-input"];

        return (
            <FixedPhone
                controllerPanel={this.getControllerPanel()}
                controllerInput={this.getControllerInput()}
            >
                <div className={styles.header}>
                    <div className={styles.back}>
                    </div>
                    <div className={styles.name}>
                        {chatName}
                    </div>
                    <div className={styles.profile}>
                    </div>
                </div>
                <div className={bodyClassName} ref={(e) => this.bodyRef = e}>
                    <MineText avatarURL={defaultAvatar} content={"本文介绍CSS动画的两大组成部分：transition和animation。我不打算给出每一条属性的详尽介绍，那样可以写一本书。这篇文章只是一个简介，帮助初学者了解全貌，同时又是一个快速指南，当你想不起某一个用法的时候，能够快速地找到提示"}/>
                    <MineText avatarURL={defaultAvatar} content={"you are"}/>

                    <OtherText avatarURL={defaultAvatar} content={"本文介绍CSS动画的两大组成部分：transition和animation。我不打算给出每一条属性的详尽介绍，那样可以写一本书。这篇文章只是一个简介，帮助初学者了解全貌，同时又是一个快速指南，当你想不起某一个用法的时候，能够快速地找到提示"}/>
                    <OtherText avatarURL={defaultAvatar} content={"you are"}/>
                </div>
            </FixedPhone>
        );
    }

    private getControllerPanel(): React.ReactElement {
        return (
            <div className={styles.panel}>
                <div className={styles.voice} onClick={() => this.setState({bottomInput: inputType.voice})}>

                </div>
                <input className={styles.input} type={"text"}>

                </input>
                <div className={styles.emoji} onClick={() => this.setState({bottomInput: inputType.emoji})}>

                </div>

                <div className={styles.addition} onClick={() => this.setState({bottomInput: inputType.addition})}>

                </div>
            </div>
        );
    }

    private getControllerInput(): React.ReactElement | void {
        const back = () => {
            this.setState({bottomInput: undefined})
        };
        switch (this.state.bottomInput) {
            case inputType.voice:
                return (
                    <InputPanel onBack={back}>
                        voice
                    </InputPanel>
                );
            case inputType.emoji:
                return (
                    <InputPanel onBack={back}>
                        Emoji
                    </InputPanel>
                );
            case inputType.addition:
                return (
                    <InputPanel onBack={back}>
                        Addition
                    </InputPanel>
                );
        }
    }
}

class InputPanel extends React.Component<{
    onBack: () => void
}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles["input-panel"]}>
                <div className={styles.child}>
                    {this.props.children}
                </div>
                <div className={styles.back} title={"返回"} onClick={this.props.onBack}>

                </div>
            </div>
        );
    }
}

