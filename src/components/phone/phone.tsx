import * as moment from "moment";
import * as React from "react";
import {Modal, TimePicker} from "antd";

import styles from "../../assets/css/iphone.module.css";

const buttonTexts: string[] = ["扶贫", "加餐", "打赏", "点赞"];
const operators: string[] = ["中国移动", "中国联通", "中国电信"];
const signalTypes: string[] = ["wifi", "3G", "4G", "5G", "6G"];
const batteryStatuses: string[] = ["normal", "charge", "saving"];

interface IPhoneStats {
    signalCount: number;
    operator: string;
    signalType: string;
    timer: Date;
    electricity: number;
    batteryStatus: string,

    timerSetVisible: boolean;
}

export class IPhone extends React.Component<{}, IPhoneStats> {
    private readonly buttonText: string;
    private timer: any;

    constructor(props: any) {
        super(props);
        this.nowTimeString = this.nowTimeString.bind(this);
        this.modifyElectricity = this.modifyElectricity.bind(this);

        this.buttonText = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
        this.timer = setInterval(() => {
            this.setState({timer: new Date()})
        }, 30000);

        this.state = {
            signalCount: 3,
            operator: operators[0],
            signalType: signalTypes[0],
            timer: new Date(),
            electricity: 64,
            batteryStatus: batteryStatuses[0],
            timerSetVisible: false,
        };
    }

    public render(): React.ReactElement {

        const electricity: number = this.state.electricity;
        let batteryValueStyles: any = {width: electricity / 100 * 80 + "%"};
        switch (this.state.batteryStatus) {
            case ("normal"):
                if (electricity <= 20) {
                    batteryValueStyles["backgroundColor"] = "red";
                    break;
                }
                batteryValueStyles["backgroundColor"] = "black";
                break;
            case ("charge"):
                batteryValueStyles["backgroundColor"] = "#56EB2C";
                break;
            default:
                batteryValueStyles["backgroundColor"] = "#ebb988";
        }

        return (
            <div className={styles.iphone}>
                <div className={styles.screen}>
                    <div className={styles.header}>
                        <div datatype={"clickable"} className={styles.signal}
                             onClick={() => {
                                 const sc: number = this.state.signalCount % 5 + 1;
                                 this.setState({signalCount: sc === 0 ? 1 : sc})
                             }}>
                            {Array.from({length: 4}).map((_, index) => {
                                return <div className={styles.bar} style={{height: (index + 1) / 4 * 50 + 20 + "%", visibility: (index + 1) > this.state.signalCount ? "hidden" : "visible"}}/>;
                            })}
                        </div>
                        <div className={styles.operator} datatype={"clickable"} onClick={() => {
                            this.setState({operator: IPhone.loop(operators, this.state.operator)})
                        }}>
                            <p>{this.state.operator}</p>
                        </div>
                        <div className={styles.type} datatype={"clickable"} onClick={() => {
                            this.setState({signalType: IPhone.loop(signalTypes, this.state.signalType)})
                        }}>
                            <p style={{display: this.state.signalType !== "wifi" ? "inline-block" : "none"}}>{this.state.signalType}</p>
                            <div style={{display: this.state.signalType === "wifi" ? "inline-block" : "none"}} className={styles.wifi}/>
                        </div>
                        <div className={styles.timer} datatype={"clickable"} onClick={() => this.setState({timerSetVisible: true})}>
                            <p>{this.nowTimeString()}</p>
                        </div>
                        <Modal
                            title={"设置时间"}
                            visible={this.state.timerSetVisible}
                            okText={"设置"}
                            cancelText={"复位"}
                            onCancel={() => {
                                this.timer = setInterval(() => {
                                    this.setState({timer: new Date()})
                                }, 30000);
                                this.setState({
                                    timer: new Date(),
                                    timerSetVisible: false,
                                })
                            }}
                            onOk={() => {
                                clearInterval(this.timer);
                                this.setState({timerSetVisible: false})
                            }}
                        >
                            <TimePicker
                                onChange={(time: moment.Moment, timeString: string) => {
                                    const tm: Date = new Date(this.state.timer.valueOf());
                                    tm.setHours(time.hours(), time.minutes());
                                    this.setState({timer: tm});
                                }}
                            />
                        </Modal>
                        <div style={{width: this.state.batteryStatus === "charge" ? "22%" : "25%"}} className={styles.electricity} datatype={"clickable"} onClick={this.modifyElectricity(true)} onContextMenu={this.modifyElectricity()}>
                            <p>{electricity}%</p>
                        </div>
                        <div className={styles.battery} datatype={"clickable"} onClick={() => this.setState({batteryStatus: IPhone.loop(batteryStatuses, this.state.batteryStatus)})}>
                            <div className={styles.value} style={batteryValueStyles}/>
                        </div>
                        <div className={styles.lightning} style={{display: this.state.batteryStatus === "charge" ? "inline-flex" : "none"}}/>
                    </div>
                </div>
                <div className={styles.button} datatype={"clickable"}>
                    {this.buttonText}
                </div>
            </div>
        );
    }

    private nowTimeString(): string {
        const hours: number = this.state.timer.getHours();
        const minutes: number = this.state.timer.getMinutes();
        return (hours < 10 ? "0" + hours : hours + "") + ":" + (minutes < 10 ? "0" + minutes : minutes + "")
    }

    private modifyElectricity(add?: boolean): (e: any) => void {
        const that = this;
        return (e: any) => {
            e.preventDefault();
            let newElectricity: number;
            const value: number = Math.floor(Math.random() * 10);
            if (add) {
                newElectricity = that.state.electricity + value;
            } else {
                newElectricity = that.state.electricity - value;
            }
            if (newElectricity >= 100) {
                newElectricity = 100;
            } else if (newElectricity <= 0) {
                newElectricity = 0;
            }
            that.setState({electricity: newElectricity})
        }
    }

    private static loop(array: string[], item: string): string {
        const index: number = array.indexOf(item);
        if (index === -1 || index + 1 >= array.length) {
            return array[0];
        }
        return array[index + 1];
    }
}
