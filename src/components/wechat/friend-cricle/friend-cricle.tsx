import * as React from "react";

import {FixedPhone} from "../../phone/fixedphone";

import defaultBackgroundPicture from "../../../assets/img/wechat-friend-default-background.jpg";
import defaultAvatar from "../../../assets/img/default_avatar1.jpg";

import styles from "../../../assets/css/wechat_friend.module.css";
import {FriendCircleMessage} from "./messages";

interface FriendCircleProps {
    backgroundImage?: string;
    userName?: string;
    userAvatar?: string;
    messages: FriendCircleMessage[];
}

interface FriendCircleStats {
    headerOpacity: number;
}

export class FriendCircle extends React.Component <FriendCircleProps, FriendCircleStats> {
    private readonly screenRef: React.RefObject<HTMLDivElement>;

    constructor(props: FriendCircleProps) {
        super(props);
        this.getBackgroundPicture = this.getBackgroundPicture.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.scrollScreenEvent = this.scrollScreenEvent.bind(this);

        this.screenRef = React.createRef<HTMLDivElement>();

        this.state = {
            headerOpacity: 0,
        }
    }

    public render(): React.ReactElement {
        return (
            <FixedPhone>
                <div className={styles.header} style={{opacity: this.state.headerOpacity}}>
                    <div className={styles.back}>
                    </div>
                    <div className={styles.title}>
                        朋友圈
                    </div>
                    <div className={styles.camera}>
                    </div>
                </div>
                <div className={styles.screen} ref={this.screenRef} onScroll={this.scrollScreenEvent}>
                    <div className={styles.body}>
                        <div className={styles["head-image"]} style={{
                            backgroundImage: "url(" + this.getBackgroundPicture() + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "277px auto"
                        }}>
                            <div className={styles.back}>
                            </div>
                            <div className={styles.camera}>
                            </div>
                            <img src={this.getUserInfo().avatar} alt={"头像"} className={styles["user-avatar"]}/>
                            <span className={styles["user-name"]}>{this.getUserInfo().name}</span>
                        </div>

                        <div className={styles.content}>
                            {this.props.messages.map((msg, index) => <MessageParse message={msg} key={index}/>)}
                        </div>
                    </div>
                </div>
            </FixedPhone>
        );
    }

    private getUserInfo(): { name: string, avatar: string } {
        return {
            avatar: this.props.userAvatar ? this.props.userAvatar : defaultAvatar,
            name: this.props.userName ? this.props.userName : "时光",
        }
    }

    private getBackgroundPicture(): string {
        return this.props.backgroundImage ? this.props.backgroundImage : defaultBackgroundPicture;
    }

    private scrollScreenEvent() {
        if (!this.screenRef.current) {
            return;
        }
        const scrollTop: number = this.screenRef.current.scrollTop;
        if (scrollTop > 220) {
            this.setState({headerOpacity: 1});
            return;
        }
        this.setState({headerOpacity: 1 - ((220 - scrollTop) / 50)});
    }
}

interface MessageParseProps {
    message: FriendCircleMessage,
}

class MessageParse extends React.Component<MessageParseProps, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.message}>
                <img src={this.props.message.userAvatar} alt={"头像"} className={styles.avatar}/>
                <div className={styles.container}>
                    <div className={styles.name}>
                        {this.props.message.userName}
                    </div>
                    <div className={styles["message-body"]}>
                        {this.props.message.message}
                    </div>
                </div>
            </div>
        );
    }
}
