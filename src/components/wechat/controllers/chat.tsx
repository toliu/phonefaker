import * as React from "react";
import {Chat, message} from "../chat/chat";

import toRightPicture from "./assets/img/to-right.png";
import styles from "./assets/css/controllers.module.css";

interface ChatControllerStates {
    messages: message[];
}

export class ChatController extends React.Component<{}, ChatControllerStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.controller}>
                <div className={styles.input}>
                    <p>input</p>
                </div>

                <div className={styles.transport}>
                    <img src={toRightPicture} alt={"transport"}/>
                </div>
                <div className={styles.output}>
                    <Chat messages={this.state.messages}/>
                </div>
            </div>
        );
    }

}
