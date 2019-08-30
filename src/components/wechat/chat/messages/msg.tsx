import * as React from "react";

import styles from "./assets/css/msg.module.css";

export class Message extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message}>
                {this.props.children}
                <div style={{clear: "both"}}>
                    
                </div>
            </div>
        );
    }

}
