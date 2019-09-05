import * as React from "react";

import {InputPanel} from "./bottom-panel";

import styles from "./assets/css/voiceinput.module.css";

interface VoiceInputProps {
    onBack: () => void;
    onSubmit: (v: number, unread: boolean) => void;
}

interface VoiceInputStats {
    voice: number;
    unread: boolean;
}

export class VoiceInput extends React.Component<VoiceInputProps, VoiceInputStats> {
    private inputRef: any;

    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            voice: 10,
            unread: false,
        };
    }

    public render(): React.ReactElement {
        return (
            <InputPanel onBack={this.props.onBack}>
                <div className={styles.input}>
                    <p>{this.state.voice}s:</p>
                    <input
                        className={styles.switch + " " + styles["check-switch-anim"]}
                        type={"checkbox"}
                        onChange={() => {
                            this.setState({
                                unread: !this.state.unread,
                            })
                        }}
                    />
                    <div
                        className={styles.submit}
                        onClick={() => {
                            this.props.onSubmit(this.state.voice, this.state.unread)
                        }}
                    >
                        发送
                    </div>
                    <input type={"range"}
                           min={1}
                           max={60}
                           onChange={this.onChange}
                           value={this.state.voice}
                           className={styles.range}
                           ref={(e) => this.inputRef = e}
                    />
                </div>
            </InputPanel>

        );
    }

    public componentDidMount() {
        const background: string = [
            "to right",
            "#68EB4A 0%",
            "#68EB4A " + this.state.voice / 60 * 100 + "%",
            "white " + this.state.voice / 60 * 100 + "%",
            "white"
        ].join(",");
        this.inputRef.style.background = `linear-gradient(${background})`;
    }

    public componentDidUpdate() {
        const background: string = [
            "to right",
            "#68EB4A 0%",
            "#68EB4A " + this.state.voice / 60 * 100 + "%",
            "white " + this.state.voice / 60 * 100 + "%",
            "white"
        ].join(",");
        this.inputRef.style.background = `linear-gradient(${background})`;
    }

    private onChange(e: any) {
        const value: number = e.target.value;
        this.setState({voice: value})
    }
}
