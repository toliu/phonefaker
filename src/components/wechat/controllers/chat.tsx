import * as React from "react";
import {Chat, message} from "../chat/chat";

import toRightPicture from "./assets/img/to-right.png";
import styles from "./assets/css/controllers.module.css";

import avatarLiu from "../chat/assets/img/liu_avatar.jpg";
import avatarZhang from "../chat/assets/img/zhang_avatar.jpg";

interface PhoneState {
    user?: string;
    messages: message[];
    avatarUrl?: string;
}

interface ChatControllerStates {
    left: PhoneState;
    right: PhoneState;
}

export class ChatController extends React.Component<{}, ChatControllerStates> {
    constructor(props: any) {
        super(props);

        this.newMessagesProcess = this.newMessagesProcess.bind(this);
        this.uploadNewAvatar = this.uploadNewAvatar.bind(this);

        this.state = {
            left: {
                messages: [],
                avatarUrl: avatarLiu,
                user: "张学友",
            },
            right: {
                messages: [],
                avatarUrl: avatarZhang,
                user: "刘德华",
            },
        }
    }

    public render(): React.ReactElement {
        return (
            <div className={styles.controller}>
                <div className={styles.left}>
                    <div className={styles.phone}>
                        <Chat
                            messages={this.state.left.messages}
                            user={this.state.right.user}
                            myAvatarURL={this.state.left.avatarUrl}
                            otherAvatarURL={this.state.right.avatarUrl}
                            newMsgRecipient={this.newMessagesProcess("left")}
                        />
                    </div>
                    <div className={styles.form}>
                        <div className={styles.avatar}>

                            <label htmlFor={"avatar-upload"}>
                                <img alt={"avatar"} src={this.state.left.avatarUrl}/>
                            </label>
                            <input id={"avatar-upload"} type={"file"} style={{display: "none"}} accept={"image/*"}
                                   onChange={this.uploadNewAvatar("left")}/>

                            <div><strong>点击头像修改</strong></div>
                        </div>
                    </div>

                </div>

                <div className={styles.transport}>
                    <img src={toRightPicture} alt={"transport"}/>
                </div>
                <div className={styles.right}>
                    <div className={styles.phone}>
                        <Chat
                            messages={this.state.right.messages}
                            user={this.state.left.user}
                            myAvatarURL={this.state.right.avatarUrl}
                            otherAvatarURL={this.state.left.avatarUrl}
                            newMsgRecipient={this.newMessagesProcess("right")}
                        />
                    </div>
                    <div className={styles.form}>
                        <div className={styles.avatar}>

                            <label htmlFor={"r-avatar-upload"}>
                                <img alt={"avatar"} src={this.state.right.avatarUrl}/>
                            </label>
                            <input id={"r-avatar-upload"} type={"file"} style={{display: "none"}} accept={"image/*"}
                                   onChange={this.uploadNewAvatar("right")}/>
                            <div><strong>点击头像修改</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private uploadNewAvatar(direction: string): (e: any) => void {
        return (e: any) => {
            const file = e.target.files[0];
            const imgRef: string = window.URL.createObjectURL(file);
            if (direction === "left") {
                this.setState({
                    left: {
                        messages: this.state.left.messages,
                        user: this.state.left.user,
                        avatarUrl: imgRef,
                    }
                });
            } else {
                this.setState({
                    right: {
                        messages: this.state.right.messages,
                        user: this.state.right.user,
                        avatarUrl: imgRef,
                    }
                });
            }
        }
    }

    private newMessagesProcess(direction: string): (msgs: message[]) => void {
        return (msgs: message[]) => {
            const otherMsg: message[] = [];
            for (const msg of msgs) {
                const nm = Object.assign({}, msg);
                nm.mine = !msg.mine;
                otherMsg.push(nm);
            }
            if (direction === "left") {
                this.setState({
                    left: {
                        messages: msgs,
                        avatarUrl: this.state.left.avatarUrl,
                        user: this.state.left.user,
                    },
                    right: {
                        messages: otherMsg,
                        avatarUrl: this.state.right.avatarUrl,
                        user: this.state.right.user,
                    }
                })
            } else {
                this.setState({
                    left: {
                        messages: otherMsg,
                        avatarUrl: this.state.left.avatarUrl,
                        user: this.state.left.user,
                    },
                    right: {
                        messages: msgs,
                        avatarUrl: this.state.right.avatarUrl,
                        user: this.state.right.user,
                    },
                })
            }
        }
    }
}
