import * as React from "react";

import styles from "../../../../assets/css/msg.module.css";

interface MessageProps {
    onDelete: () => void;
}

export class Message extends React.Component<MessageProps, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message} title={"点击删除"} onClick={() => this.props.onDelete()}>
                {this.props.children}
                <div style={{clear: "both"}}>

                </div>
            </div>
        );
    }
}
