import * as React from "react";

import {FixedPhone} from "../../phone/fixedphone";

import styles from "./assets/css/fixedchat.module.css";

interface ChatProps {
    name?: string;
}

export class FixedChat extends React.Component<ChatProps, {}> {
    private readonly defaultChatName: string;

    constructor(props: ChatProps) {
        super(props);

        this.defaultChatName = "时光";
    }

    public render(): React.ReactElement {
        const chatName: string = this.props.name ? this.props.name : this.defaultChatName;

        return (
            <FixedPhone>
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
}


