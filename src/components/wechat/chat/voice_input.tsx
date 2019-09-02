import * as React from "react";

import styles from "./assets/css/voiceinput.module.css";

interface VoiceInputProps {
    onSubmit: (v: number) => void;
}

interface VoiceInputStats {
    voice: number;
}

export class VoiceInput extends React.Component<VoiceInputProps, VoiceInputStats> {
    private inputRef: any;

    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {voice: 10};
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.input}>
                <p>{this.state.voice}s:</p>
                <div className={styles.submit} onClick={() => this.props.onSubmit(this.state.voice)}>发送</div>
                <input type={"range"}
                       min={1}
                       max={60}
                       onChange={this.onChange}
                       value={this.state.voice}
                       className={styles.range}
                       ref={(e) => this.inputRef = e}
                />
            </div>
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
