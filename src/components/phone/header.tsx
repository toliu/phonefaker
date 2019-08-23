import * as React from "react";

import signalPicture from "./assets/img/signal-4.svg";
import wifiPicture from "./assets/img/wifi.svg";

import styles from "./assets/css/header.module.css";

interface headerState {
    operator: string;
    signal: string;
    battery: number;
    now: string;
}

export class Header extends React.Component<{}, headerState> {
    private readonly operators: string[];
    private readonly signals: string[];

    constructor(props: any) {
        super(props);
        this.switchOperator.bind(this);
        this.switchSignalType.bind(this);

        this.operators = ["中国移动", "中国联通", "中国电信"];
        this.signals = ["wifi", "3G", "4G", "5G"];
        this.state = {
            operator: this.operators[0],
            signal: this.signals[0],
            battery: 100,
            now: this.getNowTimeString()
        };
    }

    public render(): React.ReactElement {
        setInterval(() => {
            this.setState({
                now: this.getNowTimeString(),
            });
        }, 300000);

        const battery: string = (this.state.battery * 79 / 100) + "%";

        return (
            <div className={styles.header}>
                <img className={styles.signal} src={signalPicture} alt={"Signal"}/>
                <span className={styles.operator} onClick={() => this.switchOperator()}>{this.state.operator}</span>
                <span className={styles["signal-type"]} onClick={() => this.switchSignalType()}>
                    <img
                        src={wifiPicture} alt={"Wifi"}
                        style={{
                            display: this.state.signal === "wifi" ? "inline" : "none"
                        }}/>
                     <span
                         style={{
                             display: this.state.signal === "wifi" ? "none" : "inline",
                             marginLeft: "0px",
                             marginRight: "4px",
                         }}>
                        {this.state.signal}
                    </span>
                </span>
                <span className={styles.timer}>
                    {this.state.now}
                </span>
                <span className={styles.battery}
                      onClick={(e) => {
                          e.preventDefault();
                          this.switchBattery(true)
                      }}
                      onContextMenu={(e) => {
                          e.preventDefault();
                          this.switchBattery(false)
                      }}
                >
                    <p className={styles.var}>{this.state.battery}%</p>
                    <span className={styles.icon}>
                        <span className={styles.value}
                              style={{
                                  width: battery,
                                  backgroundColor: this.state.battery > 20 ? "black" : "red",
                              }}>
                        </span>
                    </span>
                </span>
            </div>
        );
    }

    private getNowTimeString(): string {
        const now = new Date();
        const hour = now.getHours();
        const min = now.getMinutes();
        if (min < 10) {
            return hour + ":0" + min;
        }
        return hour + ":" + min
    }

    private switchBattery(up: boolean) {
        let random: number = Math.random() * 10;
        let nc: number;
        if (up) {
            nc = this.state.battery + random;
        } else {
            nc = this.state.battery - random;
        }
        if (nc > 100) {
            nc = 100
        } else if (nc < 0) {
            nc = 0
        }
        this.setState({battery: Math.floor(nc)})
    }

    private switchOperator() {
        let next: number = this.operators.indexOf(this.state.operator) + 1;
        if (next >= this.operators.length) {
            next = 0;
        }
        this.setState({
            operator: this.operators[next],
        });
    }

    private switchSignalType() {
        let next: number = this.signals.indexOf(this.state.signal) + 1;
        if (next >= this.signals.length) {
            next = 0;
        }
        this.setState({
            signal: this.signals[next],
        });
    }
}