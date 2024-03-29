import * as React from "react";
import {message, Modal, Tabs, Icon} from "antd";

import styles from "../../assets/css/fixphone.module.css";

const {TabPane} = Tabs;

export const PhoneHelpList: string[] = [
    "点击运营商切换运营商标志",
    "点击wifi切换信号类型",
    "点击时间进行设置",
    "左键/右键点击电量增加/减少电量",
    "点击电池切换电池状态",
];

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

    rewardVisible: boolean;

    button: {
        text: string;
        onClick: () => void;
    }
}

export class FixedPhone extends React.Component<FixedPhoneProps, FixedPhoneStats> {
    private readonly operators: string[];
    private readonly signalTypes: string[];
    private readonly buttonTexts: string[];

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
        this.buttonTexts = [
            "作者加餐", "打赏作者", "优化服务",
            "接济作者", "扶贫", "点赞作者"
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
        this.cleanTimer = this.cleanTimer.bind(this);

        this.setMinute = "";
        this.setHour = "";
        this.timeInterval = null;

        let buttonText: string;
        let buttonFunc: any;
        if (this.props.button) {
            buttonText = this.props.button.text;
            buttonFunc = this.props.button.onClick;
        } else {
            buttonText = this.buttonTexts[Math.floor(Math.random() * this.buttonTexts.length)];
            buttonFunc = () => {
                this.setState({rewardVisible: true})
            };
        }

        this.state = {
            operator: this.operators[0],
            signalType: this.signalTypes[0],
            time: this.getNow(),
            battery: 80,
            inCharge: false,
            setHours: false,
            setMinute: false,
            timeSet: false,
            rewardVisible: false,
            button: {
                text: buttonText,
                onClick: buttonFunc,
            }
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
                    <div className={styles.button} onClick={this.state.button.onClick}>
                        {this.state.button.text}
                    </div>
                </div>

                <Modal
                    visible={this.state.rewardVisible}
                    onCancel={() => {
                        message.warn("┭┮﹏┭┮");
                        this.setState({rewardVisible: false})
                    }}
                    onOk={() => this.setState({rewardVisible: false})}
                    okText={"返回"}
                    cancelText={"饿死作者"}
                >
                    <p style={{fontWeight: "bold"}}>喂作者:</p>
                    <Tabs defaultActiveKey="5">
                        <TabPane tab="豆浆" key="5">
                            <div className={styles.reward}>
                                <table>
                                    <tr>
                                        <th><Icon type="wechat" theme="filled"/></th>
                                        <th><Icon type="alipay-circle" theme="filled"/></th>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.w5}/></td>
                                        <td><span className={styles.a5}/></td>
                                    </tr>
                                </table>
                            </div>
                        </TabPane>
                        <TabPane tab="鸡腿" key="10">
                            <div className={styles.reward}>
                                <table>
                                    <tr>
                                        <th><Icon type="wechat" theme="filled"/></th>
                                        <th><Icon type="alipay-circle" theme="filled"/></th>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.w10}/></td>
                                        <td><span className={styles.a10}/></td>
                                    </tr>
                                </table>
                            </div>
                        </TabPane>
                        <TabPane tab="咖啡" key="30">
                            <div className={styles.reward}>
                                <table>
                                    <tr>
                                        <th><Icon type="wechat" theme="filled"/></th>
                                        <th><Icon type="alipay-circle" theme="filled"/></th>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.w30}/></td>
                                        <td><span className={styles.a30}/></td>
                                    </tr>
                                </table>
                            </div>
                        </TabPane>
                        <TabPane tab="小鱼干" key="50">
                            <div className={styles.reward}>
                                <table>
                                    <tr>
                                        <th><Icon type="wechat" theme="filled"/></th>
                                        <th><Icon type="alipay-circle" theme="filled"/></th>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.w50}/></td>
                                        <td><span className={styles.a50}/></td>
                                    </tr>
                                </table>
                            </div>
                        </TabPane>
                        <TabPane tab={<span>屎 <Icon type="frown" theme="twoTone"/></span>} key="100">
                            <div className={styles.reward}>
                                <table>
                                    <tr>
                                        <th><Icon type="wechat" theme="filled"/></th>
                                        <th><Icon type="alipay-circle" theme="filled"/></th>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.w100}/></td>
                                        <td><span className={styles.a100}/></td>
                                    </tr>
                                </table>
                            </div>
                        </TabPane>
                    </Tabs>
                </Modal>
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
        const hs: string = h > 9 ? h + "" : "0" + h;
        const ms: string = m > 9 ? m + "" : "0" + m;
        return [hs, ms].join(":");
    }

    private cleanTimer() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    }
}
