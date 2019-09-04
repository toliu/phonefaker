import * as React from "react";

import styles from "./assets/css/panel.module.css";

interface InputPanelProps {
    onBack: () => void;
}

export class InputPanel extends React.Component<InputPanelProps, {}> {
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
