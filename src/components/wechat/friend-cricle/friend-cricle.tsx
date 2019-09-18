import * as React from "react";

import {FixedPhone} from "../../phone/fixedphone";
import {ParseContent} from "../../../utils";
import {FriendCircleMessage} from "./messages";

import defaultBackgroundPicture from "../../../assets/img/wechat-friend-default-background.jpg";
import defaultAvatar from "../../../assets/img/default_avatar1.jpg";

import styles from "../../../assets/css/wechat_friend.module.css";

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
                            <span className={styles["user-name"]}>{ParseContent(this.getUserInfo().name)}</span>
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
    constructor(props: MessageParseProps) {
        super(props);
        this.parseAdditionElement = this.parseAdditionElement.bind(this);
    }

    public render(): React.ReactElement {
        let timeLabel: string;
        const now: Date = new Date();
        const time: Date = this.props.message.timestamp;
        const diff: number = (now.getTime() - time.getTime()) / 1000;
        const dayDiff: number = Math.floor(diff / 3600 / 24);
        if (diff < 60) {
            timeLabel = "刚刚";
        } else if (diff < 3600) {
            timeLabel = Math.floor(diff / 60) + "分钟前";
        } else if (diff < 24 * 3600) {
            timeLabel = Math.floor(diff / 3600) + "小时前";
        } else if (dayDiff < 2) {
            timeLabel = "昨天";
        } else if (dayDiff < 8) {
            timeLabel = dayDiff + "天前";
        } else {
            timeLabel = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDate() + "日";
        }

        const addition = this.props.message.addition;

        return (
            <div className={styles.message}>
                <img src={this.props.message.userAvatar} alt={"头像"} className={styles.avatar}/>
                <div className={styles.container}>
                    <div className={styles.name}>
                        {ParseContent(this.props.message.userName)}
                    </div>
                    <div className={styles["message-body"]}>
                        {ParseContent(this.props.message.message || "")}
                    </div>
                    <div className={styles.addition} style={{display: addition ? "block" : "none"}}>
                        {this.parseAdditionElement()}
                    </div>
                    <div className={styles.location}>
                        {this.props.message.location ? this.props.message.location.join("・") : ""}
                    </div>
                    <div className={styles.time}>
                        {timeLabel}
                        <div className={styles.dot}>
                        </div>
                    </div>
                    <div className={styles.like} style={{display: this.props.message.like && this.props.message.like.length > 0 ? "block" : "none"}}>
                        {this.props.message.like && this.props.message.like.length > 0 ? this.props.message.like.map((lk, index) => {
                            if (index === this.props.message.like.length - 1) {
                                return <span>{ParseContent(lk)}</span>
                            }
                            return <span>{ParseContent(lk + ", ")}</span>
                        }) : ""}
                    </div>
                    <div className={styles.comment} style={{display: this.props.message.comments && this.props.message.comments.length > 0 ? "block" : "none"}}>
                        {this.props.message.comments && this.props.message.comments.length > 0 ? this.props.message.comments.map((cmt, index) => {
                            return (
                                <div key={index}>
                                    <span className={styles.name}>{ParseContent(cmt.by)}</span>
                                    <span>{cmt.to ? "回复" : ""}</span>
                                    <span className={styles.name} style={{display: cmt.to ? "inline-block" : "none"}}>
                                        {ParseContent(cmt.to || "")}
                                        </span>
                                    <span>:</span>
                                    <span>{ParseContent(cmt.content)}</span>
                                </div>
                            );
                        }) : ""}
                    </div>
                </div>
            </div>
        );
    }

    private parseAdditionElement(): any {
        const addition = this.props.message.addition;
        if (!addition) {
            return (<div style={{display: "none"}}>
            </div>)
        }
        switch (addition.kind) {
            case "pictures":
                const pictures: string[] = addition.pictures;
                if (pictures.length === 1) {
                    return <img src={pictures[0]} alt={"图片"} style={{
                        maxWidth: 150,
                        maxHeight: 210,
                    }}/>
                }
                return addition.pictures.map((pic, index) => {
                    if (index > 8) {
                        return "";
                    }
                    return (
                        <div
                            className={styles.picture}
                            style={{
                                backgroundImage: "url(" + pic + ")",
                            }}
                        />
                        //     <img key={index} src={pic} alt={"图片"}/>
                        // </div>
                    );
                });

        }
        return (
            <div>
                addition
            </div>
        );
    }
}
