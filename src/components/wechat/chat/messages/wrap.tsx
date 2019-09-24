import * as React from "react";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

interface MessageWrapProps {
    OnClick?: () => void;
    style?: CSSStyleSheet | {};
}

export class MessageWrap extends React.Component<MessageWrapProps, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message} style={this.props.style ? this.props.style : {}}>
                {this.props.children}
            </div>
        );
    }
}
