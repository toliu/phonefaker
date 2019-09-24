import * as React from "react";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

interface MessageWrapProps {
    OnDelete?: () => void;
    style?: CSSStyleSheet | {};
}

export class MessageWrap extends React.Component<MessageWrapProps, {}> {
    public render(): React.ReactElement {
        return (
            <div
                title={this.props.OnDelete ? "右击删除" : ""}
                className={[styles.message, this.props.OnDelete ? styles.deletable : ""].join(" ")}
                style={this.props.style ? this.props.style : {}}
                onContextMenu={(e) => {
                    if (this.props.OnDelete) {
                        e.preventDefault();
                        this.props.OnDelete()
                    }
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
