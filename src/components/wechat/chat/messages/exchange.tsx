import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/wechat_exchange.module.css";

import exchangeNoReceivedIcon from "../../../../assets/img/wechat_exchange.png";
import exchangeReceivedIcon from "../../../../assets/img/wechat_exchange_received.png";

interface ExchangeProps {
    onDelete: () => void;
    avatar: string;
    money: number;
    title: string;
    received: boolean;
}

export class MineExchange extends React.Component<ExchangeProps, {}> {
    public render(): React.ReactElement {
        const moneyString: string = Math.floor(this.props.money * 100) + "";
        const money: string = moneyString.slice(0, moneyString.length - 2) + "." + moneyString.slice(-2);
        let picture: string = exchangeNoReceivedIcon;
        let opacity: boolean = false;
        if (this.props.received) {
            picture = exchangeReceivedIcon;
            opacity = true;
        }
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img src={this.props.avatar} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.exchange} style={{opacity: opacity ? 0.5 : 1}}>
                        <img src={picture} alt={"receive"} className={styles.icon}/>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <span>￥{money}</span>
                            </div>
                            <div className={styles.down}>
                                {this.props.received ? "已被领取-" : ""}{this.props.title}
                            </div>
                        </div>
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherExchange extends React.Component<ExchangeProps, {}> {
    public render(): React.ReactElement {
        const moneyString: string = Math.floor(this.props.money * 100) + "";
        const money: string = moneyString.slice(0, moneyString.length - 2) + "." + moneyString.slice(-2);
        let picture: string = exchangeNoReceivedIcon;
        let opacity: boolean = false;
        if (this.props.received) {
            picture = exchangeReceivedIcon;
            opacity = true;
        }
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img src={this.props.avatar} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.exchange} style={{opacity: opacity ? 0.5 : 1}}>
                        <img src={picture} alt={"receive"} className={styles.icon}/>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <span>￥{money}</span>
                            </div>
                            <div className={styles.down}>
                                {this.props.received ? "已被领取-" : ""}{this.props.title}
                            </div>
                        </div>
                    </div>
                </div>
            </Message>
        )
    }
}

interface ExchangeReceivedProps {
    onDelete: () => void;
    avatar: string;
    money: number;
}

export class MineExchangeReceived extends React.Component<ExchangeReceivedProps, {}> {
    public render(): React.ReactElement {
        const moneyString: string = Math.floor(this.props.money * 100) + "";
        const money: string = moneyString.slice(0, moneyString.length - 2) + "." + moneyString.slice(-2);
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.mine}>
                    <img src={this.props.avatar} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.exchange} style={{opacity: 0.5}}>
                        <img src={exchangeReceivedIcon} alt={"receive"} className={styles.icon}/>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <span>￥{money}</span>
                            </div>
                            <div className={styles.down}>
                                已收款
                            </div>
                        </div>
                    </div>
                </div>
            </Message>
        );
    }
}

export class OtherExchangeReceived extends React.Component<ExchangeReceivedProps, {}> {
    public render(): React.ReactElement {
        const moneyString: string = Math.floor(this.props.money * 100) + "";
        const money: string = moneyString.slice(0, moneyString.length - 2) + "." + moneyString.slice(-2);
        return (
            <Message onDelete={this.props.onDelete}>
                <div className={styles.other}>
                    <img src={this.props.avatar} alt={"头像"} className={styles.avatar}/>
                    <div className={styles.exchange} style={{opacity: 0.5}}>
                        <img src={exchangeReceivedIcon} alt={"receive"} className={styles.icon}/>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <span>￥{money}</span>
                            </div>
                            <div className={styles.down}>
                                已收款
                            </div>
                        </div>
                    </div>
                </div>
            </Message>
        );
    }
}
