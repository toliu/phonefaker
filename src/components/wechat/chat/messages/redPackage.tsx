import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/wechat_redpackage.module.css";
import systemStyles from "../../../../assets/css/msg.module.css";

interface RedPackageProps {
    onDelete: () => void;
    title: string;
    avatarURL: string;
    unread: boolean;
}

interface RedPackageReceivedProps {
    odDelete: () => void;
    who: string;
}

export class MineRedPackage extends React.Component<RedPackageProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.onDelete} isSystem={false}>
                <div className={styles.mine}>
                    <img src={this.props.avatarURL} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.package}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.title}>
                            {this.props.title}
                        </div>
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
                    <div className={styles.package}>
                        <div className={styles.icon}>

                        </div>
                        <div className={styles.title}>
                            {this.props.title}
                        </div>
                    </div>
                </div>
            </Message>
        );
    }
}

export class RedPackageReceived extends React.Component<RedPackageReceivedProps, {}> {
    public render(): React.ReactElement {
        return (
            <Message onDelete={this.props.odDelete} isSystem={true}>
                <span className={systemStyles["package-received"]}>
                    <span className={systemStyles.icon}/>
                    {this.props.who}领取了你的<span style={{color: "#D1B090"}}>红包</span>
                </span>
            </Message>
        );
    }
}