import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/wechat_redpackage.module.css";

interface RedPackageProps {
    onDelete: () => void;
    title: string;
    avatarURL: string;
    unread: boolean;
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
