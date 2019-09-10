import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/wechat_redpackage.module.css";
import systemStyles from "../../../../assets/css/msg.module.css";

import redPackageOpend from "../../../../assets/img/wechat_red_package_opend.png";

interface RedPackageProps {
    onDelete: () => void;
    title: string;
    avatarURL: string;
    unread: boolean;
    received: boolean;
}

interface RedPackageReceivedProps {
    odDelete: () => void;
    who: string;
    mine?: boolean;
}

export class MineRedPackage extends React.Component<RedPackageProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete} isSystem={false}>
                <div className={styles.mine}>
                    <img src={this.props.avatarURL} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.package} style={{opacity: this.props.received ? 0.5 : 1}}>
                        <div className={this.props.received ? styles.open : styles.close}>

                        </div>
                        <div className={styles.title} style={this.props.received ? {top: 4} : {}}>
                            {this.props.title}
                        </div>
                        {this.props.received ?
                            <div className={styles.received}>
                                已领取
                            </div>
                            : ""}
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherRedPackage extends React.Component<RedPackageProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete} isSystem={false}>
                <div className={styles.other}>
                    <img src={this.props.avatarURL} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.package} style={{opacity: this.props.received ? 0.5 : 1}}>
                        <div className={this.props.received ? styles.open : styles.close}>

                        </div>
                        <div className={styles.title} style={this.props.received ? {top: 4} : {}}>
                            {this.props.title}
                        </div>
                        {this.props.received ?
                            <div className={styles.received}>
                                已领取
                            </div>
                            : ""}
                    </div>
                </div>
            </Message>
        );
    }
}

export class RedPackageReceived extends React.Component<RedPackageReceivedProps, {}> {
    public render(): React.ReactElement {
        let content: string = this.props.who + "领取了你的";
        if (this.props.mine) {
            content = "你领取了" + this.props.who + "的"
        }
        return (
            <Message onDelete={this.props.odDelete} isSystem={true}>
                <span className={systemStyles["package-received"]}>
                    <span className={systemStyles.icon}/>
                    {content}<span style={{color: "#D1B090"}}>红包</span>
                </span>
            </Message>
        );
    }
}