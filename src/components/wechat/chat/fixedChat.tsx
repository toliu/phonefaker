import * as React from "react";

import {FixedPhone} from "../../phone/fixedphone";

import styles from "./assets/css/fixedchat.module.css";

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

    constructor(props: ChatProps) {
        super(props);

        this.getControllerPanel = this.getControllerPanel.bind(this);
        this.getControllerInput = this.getControllerInput.bind(this);

        this.defaultChatName = "时光";

        this.state = {
            bottomInput: undefined,
        }
    }

    public render(): React.ReactElement {
        const chatName: string = this.props.name ? this.props.name : this.defaultChatName;

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

