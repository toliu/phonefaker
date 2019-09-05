import * as React from "react";

import styles from "./assets/css/panel.module.css";

import backPicture from "./assets/img/bottom_input_back.png";

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
                    <img src={backPicture} alt={"返回"}/>
                </div>
            </div>
        );
    }
}
