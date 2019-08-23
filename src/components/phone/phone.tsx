import * as React from "react";

import topPicture from "./assets/img/phone-top.png";

import styles from "./assets/css/phone.module.css";


interface PhoneProps {
    button?: {
        text: string;
        onClick: () => void;
    };
}

export class Phone extends React.Component<PhoneProps, {}> {

    public render(): React.ReactElement {
        return (
            <div className={styles.phone}>
                <img src={topPicture} alt={"Phone Top"} className={styles["phone-top"]}/>
                <div className={styles["main-phone"]}>
                    <div className={styles.screen}>
                        {this.props.children}
                    </div>
                </div>
                <div className={styles["phone-bottom"]}>
                    <div className={styles.button} onClick={() => {
                        if (this.props.button) {
                            return this.props.button.onClick();
                        }
                    }}><p>{this.props.button ? this.props.button.text : "按钮"}</p></div>
                </div>
            </div>
        );
    }
}
