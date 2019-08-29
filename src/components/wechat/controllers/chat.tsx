import * as React from "react";

import {Chat, message} from "../chat/chat";

import milePicture from "./assets/img/mail.png";
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
    send: boolean;
}

export class ChatController extends React.Component<{}, ChatControllerStates> {
    private nameInputRefs: any[];

    constructor(props: any) {
        super(props);

        this.newMessagesProcess = this.newMessagesProcess.bind(this);
        this.uploadNewAvatar = this.uploadNewAvatar.bind(this);
        this.modifyUserName = this.modifyUserName.bind(this);
        this.nameInputRefs = [];

        this.state = {
            left: {
                messages: [],
                avatarUrl: avatarZhang,
                user: "张学友",
            },
            right: {
                messages: [],
                avatarUrl: avatarLiu,
                user: "刘德华",
            },
            send: true,
        }
    }

    public render(): React.ReactElement {

        const modifyUserLeft = this.modifyUserName("left");
        const modifyUserRight = this.modifyUserName("eight");
        return (
            <div className={styles.controller}>
                <div className={styles.left}>
                    <div className={styles.form}>
                        <div className={styles.avatar}>
                            <label htmlFor={"avatar-upload"}>
                                <img alt={"avatar"} src={this.state.left.avatarUrl}/>
                            </label>
                            <input id={"avatar-upload"} type={"file"} style={{display: "none"}} accept={"image/*"}
                                   onChange={this.uploadNewAvatar("left")}/>
                            <p>点击头像修改</p>
                        </div>
                        <div className={styles.user} onKeyUp={modifyUserLeft}>
                            <span>修改用户名：</span>
                            <input type={"text"} placeholder={this.state.left.user} onChange={modifyUserLeft}
                                   ref={(e) => this.nameInputRefs.push(e)}/>
                            <input type={"button"} value={"修改"} onClick={() => modifyUserLeft("send")}/>
                        </div>
                    </div>
                    <div className={styles.phone}>
                        <Chat
                            messages={this.state.left.messages}
                            user={this.state.right.user}
                            myAvatarURL={this.state.left.avatarUrl}
                            otherAvatarURL={this.state.right.avatarUrl}
                            newMsgRecipient={this.newMessagesProcess("left")}
                        />
                    </div>


                </div>

                <div className={styles.transport}>
                    <div className={styles.container}>
                        <img
                            src={milePicture}
                            className={styles["message-icon"] + " " + (this.state.send ? styles["message-send"] : styles["message-receive"])}
                            alt={"transport"}/>
                    </div>
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
                            <p>点击头像修改</p>
                        </div>

                        <div className={styles.user} onKeyUp={modifyUserRight}>
                            <span>修改用户名：</span>
                            <input type={"text"} placeholder={this.state.right.user}
                                   onChange={modifyUserRight} ref={(e) => this.nameInputRefs.push(e)}/>
                            <input type={"button"} value={"修改"} onClick={() => modifyUserRight("send")}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    private modifyUserName(direction: string): (event: any) => void {
        const modify = (name: string) => {
            if (direction === "left") {
                this.nameInputRefs[0].value = "";
                this.setState({
                    left: {
                        user: name,
                        messages: this.state.left.messages,
                        avatarUrl: this.state.left.avatarUrl,
                    }
                });
            } else {
                this.nameInputRefs[1].value = "";
                this.setState({
                    right: {
                        user: name,
                        messages: this.state.right.messages,
                        avatarUrl: this.state.right.avatarUrl,
                    }
                });
            }
        };

        let user: string;
        return (event: any) => {
            if (event === "send" || event.keyCode === 13) {
                if (user) {
                    modify(user);
                }
            } else {
                user = event.target.value
            }
        }
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
                    },
                    send: true,
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
                    send: false,
                })
            }
        }
    }
}
