import * as React from "react";
import html2canvas from "html2canvas";

import styles from "./assets/css/fixphone.module.css";

export const HEADERPADDINGPX: number = 18;

interface FixedPhoneProps {
    controllerPanel?: React.ReactElement;
    controllerInput?: React.ReactElement | void;
    button?: {
        text: string;
        onClick?: () => void;
    }
}

interface FixedPhoneStats {
    operator: string;
    signalType: string;


    battery: number;
    inCharge: boolean;

    time: string;
    setHours: boolean;
    setMinute: boolean;
    timeSet: boolean;
}

export class FixedPhone extends React.Component<FixedPhoneProps, FixedPhoneStats> {
    private readonly operators: string[];
    private readonly signalTypes: string[];

    private screenRef: any;

    private setHour: string;
    private setMinute: string;
    private timeInterval: any;

    constructor(props: FixedPhoneProps) {
        super(props);
        this.operators = [
            "中国移动",
            "中国联通",
            "中国电信"
        ];

        this.signalTypes = [
            "wifi",
            "3G",
            "4G",
            "5G",
            "6G",
        ];

        this.switchOperator = this.switchOperator.bind(this);
        this.switchSignalType = this.switchSignalType.bind(this);
        this.switchBattery = this.switchBattery.bind(this);
        this.screenSnapshot = this.screenSnapshot.bind(this);
        this.cleanTimer = this.cleanTimer.bind(this);

        this.setMinute = "";
        this.setHour = "";
        this.timeInterval = null;

        this.state = {
            operator: this.operators[0],
            signalType: this.signalTypes[0],
            time: this.getNow(),
            battery: 80,
            inCharge: false,
            setHours: false,
            setMinute: false,
            timeSet: false,
        }
    }

    public render(): React.ReactElement {
        let bodyClass: string = styles["body-no-controller"];
        if (this.props.controllerPanel) {
            bodyClass = styles["body-no-input"];
            if (this.props.controllerInput) {
                bodyClass = styles.body;
            }
        }

        let signalTypeClass: string = styles["signal-type"];
        if (this.state.signalType === "wifi") {
            signalTypeClass = styles.wifi
        }

        const batteryLength: number = this.state.battery / 100 * 20;

        if (!this.timeInterval) {
            this.timeInterval = setInterval(() => {
                this.setState({time: this.getNow()})
            }, 30000);
        }


        return (
            <div className={styles.phone}>
                <div className={styles.top}>
                </div>

                <div className={styles.middle}>
                    <div className={styles.screen} ref={(e) => this.screenRef = e}>
                        <div className={styles.header}>
                            <div className={styles.signal}>
                            </div>
                            <div className={styles.operator} onClick={() => this.switchOperator()}>
                                {this.state.operator}
                            </div>

                            <div className={signalTypeClass} onClick={() => this.switchSignalType()}>
                                {this.state.signalType === "wifi" ? "" : this.state.signalType}
                            </div>
                            <div className={styles.timer}>
                                <span className={styles.hours} onClick={() => this.setState({setHours: true})}>
                                    {this.state.setHours ?
                                        <input type={"number"} min={0} max={23}
                                               onKeyUp={(e: any) => {
                                                   if (e.keyCode === 13) {
                                                       this.setState({
                                                           time: this.setHour + this.state.time.slice(2, 5),
                                                           setHours: false,
                                                           timeSet: true,
                                                       });
                                                       this.cleanTimer()
                                                   } else if (e.keyCode === 27) {
                                                       this.setState({
                                                           setHours: false,
                                                       });
                                                   }
                                               }}
                                               onChange={(e: any) => {
                                                   const v = parseInt(e.target.value, 10);
                                                   if (v > 23) {
                                                       this.setHour = "23";
                                                   } else if (v < 0) {
                                                       this.setHour = "00";
                                                   } else {
                                                       this.setHour = v > 9 ? v + "" : "0" + v;
                                                   }

                                               }}
                                               autoFocus={true}
                                        /> :
                                        this.state.time.slice(0, 2)}
                                </span>
                                :
                                <span className={styles.minute} onClick={() => this.setState({setMinute: true})}>
                                    {this.state.setMinute ?
                                        <input type={"number"} min={0} max={59}
                                               onKeyUp={(e: any) => {
                                                   if (e.keyCode === 13) {
                                                       this.setState({
                                                           time: this.state.time.slice(0, 3) + this.setMinute,
                                                           setMinute: false,
                                                           timeSet: true,
                                                       });
                                                       this.cleanTimer()
                                                   } else if (e.keyCode === 27) {
                                                       this.setState({
                                                           setMinute: false,
                                                       });
                                                   }
                                               }}
                                               onChange={(e: any) => {
                                                   const v = parseInt(e.target.value, 10);
                                                   if (v > 59) {
                                                       this.setMinute = "59";
                                                   } else if (v < 0) {
                                                       this.setMinute = "00";
                                                   } else {
                                                       this.setMinute = v > 9 ? v + "" : "0" + v;
                                                   }

                                               }}
                                               autoFocus={true}
                                        /> : this.state.time.slice(3, 5)
                                    }
                                        </span>
                            </div>
                            <div
                                className={styles["battery-percent"]}
                                onClick={(e) => this.switchBattery(true)(e)}
                                onContextMenu={(e) => this.switchBattery()(e)}
                                style={{width: this.state.inCharge ? 35 : 45}}
                            >
                                {this.state.battery}%
                            </div>
                            <div className={styles["battery-icon"]} onClick={() => this.setState({
                                inCharge: !this.state.inCharge,
                            })}>
                                        <span style={{
                                            width: batteryLength,
                                            backgroundColor: this.state.inCharge ? "#56EB2C" : (this.state.battery > 20 ? "black" : "red"),
                                        }}>

                                        </span>
                            </div>
                            <div className={styles.lightning}>

                            </div>

                        </div>
                        <div className={bodyClass}>
                            {this.props.children}
                        </div>

                        <div className={styles.controller}
                             style={{display: this.props.controllerPanel ? "block" : "none"}}>
                            {this.props.controllerPanel}
                        </div>
                        <div className={styles.input}
                             style={{display: this.props.controllerPanel && this.props.controllerInput ? "block" : "none"}}>
                            {this.props.controllerInput ? this.props.controllerInput : ""}
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.button} onClick={
                        this.props.button && this.props.button.onClick ? this.props.button.onClick : this.screenSnapshot}>
                        {this.props.button ? this.props.button.text : "截屏"}
                    </div>
                </div>
            </div>
        );
    }

    private switchOperator() {
        let next = this.operators.indexOf(this.state.operator) + 1;
        if (next >= this.operators.length) {
            next = 0;
        }
        this.setState({operator: this.operators[next]})
    }

    private switchSignalType() {
        let next = this.signalTypes.indexOf(this.state.signalType) + 1;
        if (next >= this.signalTypes.length) {
            next = 0;
        }
        this.setState({signalType: this.signalTypes[next]})
    }

    private switchBattery(up?: boolean): (e: any) => void {
        return (e: any) => {
            e.preventDefault();
            const n: number = Math.floor(Math.random() * 10) + 1;
            let nb: number;
            if (up) {
                nb = this.state.battery + n;
            } else {
                nb = this.state.battery - n;
            }
            if (nb > 100) {
                nb = 100;
            } else if (nb < 0) {
                nb = 0;
            }
            this.setState({battery: nb})
        }
    }

    private getNow(): string {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        if (m >= 10) {
            return [h, m].join(":")
        } else {
            return [h, "0" + m].join(":")
        }
    }

    private screenSnapshot() {
        html2canvas(this.screenRef, {
            scale: 2,
            height: 493,
            width: 277,
            useCORS: true,
        }).then(
            (canvas) => {
                const now = new Date();
                const dlLink = document.createElement('a');
                dlLink.download = now.getFullYear() + "" + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + ".png";
                dlLink.href = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
                dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }
        )
    }

    private cleanTimer() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    }
}
