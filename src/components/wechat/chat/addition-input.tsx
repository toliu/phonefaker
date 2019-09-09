import {UploadChangeParam} from "antd/es/upload";
import * as React from "react";
import moment from "moment";
import {DatePicker, Modal, Switch, TimePicker, Icon, Input, Upload, message} from "antd";

import {InputPanel} from "./bottom-panel";

import timeIcon from "../../../assets/img/wechat_time_input.png";
import alreadyFriendIcon from "../../../assets/img/already_friend_icon.png";
import backgroundIcon from "../../../assets/img/wechat_backgroud_input.png";
import redPackageIcon from "../../../assets/img/wechat-red-package.png";
import redPackageReceivedIcon from "../../../assets/img/wechat-red-package-receive.png";
import exchangeIcon from "../../../assets/img/wechat_exchange.png";
import exchangeReceivedIcon from "../../../assets/img/wechat_exchange_received.png";
import pictureIcon from "../../../assets/img/wechat_picture_input.png";

import styles from "../../../assets/css/wechat_addition.module.css";

interface AdditionInputProps {
    onBack: () => void;
    selectTime: (t: Date) => void;
    alreadyFriend: () => void;
    backgroundImage: (src: string) => void;
    sendRedPackage: (title: string) => void;
    receiveRedPackage: () => void;
    sendExchange: (money: number, content: string, received: boolean) => void;
    sendExchangeReceived: (money: number) => void;
    sendPicture: (src: string) => void;
}

interface AdditionInputStats {
    timeInputVisible: boolean;
    selectedTime: Date;

    backgroundInputVisible: boolean;
    selectedBackground: string;

    redPackageInputVisible: boolean;
    inputRedPackageTitle: string;

    exchangeInputVisible: boolean;
    inputExchangeMoney: number;
    inputExchangeContent: string;
    exchangeReceived: boolean;
    exchangeReceivedInputVisible: boolean;
    inputExchangeReceivedMoney: number;

    sendPictureInputVisible: boolean;
    sendPictureSrc?: string;
}


export class AdditionInput extends React.Component<AdditionInputProps, AdditionInputStats> {
    constructor(props: AdditionInputProps) {
        super(props);
        this.state = {
            timeInputVisible: false,
            selectedTime: new Date(),
            backgroundInputVisible: false,
            selectedBackground: "",
            redPackageInputVisible: false,
            inputRedPackageTitle: "恭喜发财，大吉大利",
            exchangeInputVisible: false,
            inputExchangeMoney: 1,
            inputExchangeContent: "拿去花",
            exchangeReceived: true,
            exchangeReceivedInputVisible: false,
            inputExchangeReceivedMoney: 1,
            sendPictureInputVisible: false,
        };
    };

    public render(): React.ReactElement {
        return (
            <InputPanel onBack={this.props.onBack}>
                <div className={styles.box}>
                    <div className={styles.item} title={"添加时间戳"}>
                        <img
                            src={timeIcon} alt={"时间"}
                            className={styles.icon}
                            onClick={() => this.setState({timeInputVisible: true})}/>
                        <div className={styles.label}>
                            时间
                        </div>
                        <Modal title="添加时间" visible={this.state.timeInputVisible}
                               onOk={() => {
                                   this.props.selectTime(this.state.selectedTime);
                                   this.setState({
                                       timeInputVisible: false,
                                       selectedTime: new Date(),
                                   })
                               }}
                               onCancel={() => this.setState({timeInputVisible: false})}
                               okText="添加时间" cancelText="取消">
                            <DatePicker
                                defaultValue={moment()}
                                onChange={(m: moment.Moment | null, st: string) => {
                                    if (!m) {
                                        return;
                                    }
                                    let selectedTime: Date = this.state.selectedTime;
                                    selectedTime.setFullYear(m.year());
                                    selectedTime.setMonth(m.month());
                                    selectedTime.setDate(m.date());
                                    this.setState({selectedTime: selectedTime})
                                }}/>
                            <TimePicker
                                defaultValue={moment()}
                                onChange={(m: moment.Moment, ts: string) => {
                                    let selectedTime: Date = this.state.selectedTime;
                                    selectedTime.setHours(m.hours());
                                    selectedTime.setMinutes(m.minutes());
                                    this.setState({selectedTime: selectedTime});
                                }}
                            />
                        </Modal>
                    </div>

                    <div className={styles.item} title={"添加已是好友系统消息"}>
                        <img
                            src={alreadyFriendIcon} alt={"好友"}
                            className={styles.icon}
                            onClick={this.props.alreadyFriend}/>
                        <div className={styles.label}>
                            好友
                        </div>
                    </div>

                    <div className={styles.item} title={"更换聊天背景"}>
                        <img
                            src={backgroundIcon} alt={"背景"} className={styles.icon}
                            onClick={() => this.setState({backgroundInputVisible: true})}
                        />
                        <div className={styles.label}>
                            换背景
                        </div>
                        <Modal title="更换聊天背景" visible={this.state.backgroundInputVisible}
                               onOk={() => {
                                   if (this.state.selectedBackground) {
                                       this.props.backgroundImage(this.state.selectedBackground)
                                   }
                                   this.setState({backgroundInputVisible: false})
                               }}
                               onCancel={() => this.setState({backgroundInputVisible: false})}
                               okText="更换背景" cancelText="取消">
                            <Upload
                                name="background" accept={"image/*"} listType="picture-card"
                                showUploadList={false}
                                className={styles["background-uploader"]}
                                beforeUpload={AdditionInput.beforeImageUpload}
                                onChange={(info: UploadChangeParam) => {
                                    const reader = new FileReader();
                                    reader.addEventListener("load", () => {
                                        this.setState({
                                                selectedBackground: reader.result as string,
                                            }
                                        );
                                    });
                                    reader.readAsDataURL(info.file.originFileObj as File);
                                }}
                            >
                                {this.state.selectedBackground ?
                                    <img src={this.state.selectedBackground} alt={"background"} style={{width: "100%"}}/>
                                    : <div>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">Upload</div>
                                    </div>}
                            </Upload>
                        </Modal>
                    </div>

                    <div className={styles.item} title={"发送红包"}>
                        <img
                            src={redPackageIcon} alt={"红包"}
                            className={styles.icon}
                            onClick={() => {
                                this.setState({redPackageInputVisible: true})
                            }}/>
                        <div className={styles.label}>
                            发红包
                        </div>
                        <Modal title="发送红包给好友" visible={this.state.redPackageInputVisible}
                               onOk={() => {
                                   if (this.state.inputRedPackageTitle) {
                                       this.props.sendRedPackage(this.state.inputRedPackageTitle)
                                   }
                                   this.setState({redPackageInputVisible: false})
                               }}
                               onCancel={() => this.setState({redPackageInputVisible: false})}
                               okText="发送红包" cancelText="取消">
                            <Input
                                placeholder={this.state.inputRedPackageTitle}
                                onChange={(e: any) => {
                                    if (e.target) {
                                        this.setState({
                                            inputRedPackageTitle: e.target.value,
                                        })
                                    }
                                }}
                            />
                        </Modal>
                    </div>

                    <div className={styles.item} title={"添加收红包系统信息"}>
                        <img
                            src={redPackageReceivedIcon} alt={"收红包"}
                            className={styles.icon}
                            onClick={this.props.receiveRedPackage}/>
                        <div className={styles.label}>
                            收红包
                        </div>
                    </div>

                    <div className={styles.item} title={"转账"}>
                        <img
                            src={exchangeIcon} alt={"转账"}
                            className={styles.icon}
                            style={{backgroundColor: "#F39A39"}}
                            onClick={() => this.setState({exchangeInputVisible: true})}/>
                        <div className={styles.label}>
                            转账
                        </div>
                        <Modal title="转账给好友" visible={this.state.exchangeInputVisible}
                               onOk={() => {
                                   this.props.sendExchange(this.state.inputExchangeMoney, this.state.inputExchangeContent, this.state.exchangeReceived)
                                   this.setState({exchangeInputVisible: false})
                               }}
                               onCancel={() => this.setState({exchangeInputVisible: false})}
                               okText="转账" cancelText="取消">
                            <label>转账金额:</label>
                            <Input
                                placeholder={this.state.inputExchangeMoney + ""}
                                prefix={"￥"}
                                suffix={"RMB"}
                                onChange={(e) => {
                                    const value: number = parseInt(e.target.value, 10);
                                    if (value) {
                                        this.setState({inputExchangeMoney: value})
                                    }
                                }}
                            />
                            <label>转账说明:</label>
                            <Input
                                placeholder={this.state.inputExchangeContent}
                                onChange={(e) => {
                                    const value: string = e.target.value;
                                    if (value) {
                                        this.setState({inputRedPackageTitle: value})
                                    }
                                }}
                            />
                            <label>已接收:</label>
                            <br/>
                            <Switch
                                checkedChildren={<Icon type="check"/>}
                                unCheckedChildren={<Icon type="close"/>}
                                size="small"
                                defaultChecked
                                onChange={() => {
                                    this.setState({exchangeReceived: !this.state.exchangeReceived})
                                }}
                            />
                            <br/>
                        </Modal>
                    </div>

                    <div className={styles.item} title={"收账"}>
                        <img
                            src={exchangeReceivedIcon} alt={"收账"}
                            className={styles.icon}
                            style={{backgroundColor: "#F39A39", opacity: 0.5}}
                            onClick={() => this.setState({exchangeReceivedInputVisible: true})}/>
                        <div className={styles.label}>
                            收账
                        </div>
                        <Modal title="收账" visible={this.state.exchangeReceivedInputVisible}
                               onOk={() => {
                                   if (this.state.inputExchangeReceivedMoney) {
                                       this.props.sendExchangeReceived(this.state.inputExchangeReceivedMoney);
                                       this.setState({exchangeReceivedInputVisible: false})
                                   }
                               }}
                               onCancel={() => this.setState({exchangeReceivedInputVisible: false})}
                               okText="收账" cancelText="取消">
                            <label>收账金额:</label>
                            <Input
                                placeholder={this.state.inputExchangeReceivedMoney + ""}
                                prefix={"￥"}
                                suffix={"RMB"}
                                onChange={(e) => {
                                    const value: number = parseInt(e.target.value, 10);
                                    if (value) {
                                        this.setState({inputExchangeReceivedMoney: value})
                                    }
                                }}
                            />
                        </Modal>
                    </div>

                    <div className={styles.item} title={"发送图片"}>
                        <img
                            src={pictureIcon} alt={"发图"}
                            className={styles.icon}
                            onClick={() => {
                                this.setState({sendPictureInputVisible: true})
                            }}/>
                        <div className={styles.label}>
                            发图
                        </div>

                        <Modal title="发送图片" visible={this.state.sendPictureInputVisible}
                               onOk={() => {
                                   if (this.state.sendPictureSrc) {
                                       this.props.sendPicture(this.state.sendPictureSrc)
                                   }
                                   this.setState({sendPictureInputVisible: false})
                               }}
                               onCancel={() => this.setState({sendPictureInputVisible: false})}
                               okText="发送" cancelText="取消">
                            <Upload
                                name="background" accept={"image/*"} listType="picture-card"
                                showUploadList={false}
                                className={styles["background-uploader"]}
                                beforeUpload={AdditionInput.beforeImageUpload}
                                onChange={(info: UploadChangeParam) => {
                                    const reader = new FileReader();
                                    reader.addEventListener("load", () => {
                                        this.setState({
                                                sendPictureSrc: reader.result as string,
                                            }
                                        );
                                    });
                                    reader.readAsDataURL(info.file.originFileObj as File);
                                }}
                            >
                                {
                                    this.state.sendPictureSrc ?
                                        <img src={this.state.sendPictureSrc} alt={"发送"} style={{width: "100%"}}/>
                                        : <div>
                                            <Icon type="plus"/>
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                }
                            </Upload>
                        </Modal>

                    </div>

                </div>
            </InputPanel>
        );
    }

    private static beforeImageUpload(file: File) {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("只能是jpeg或png格式的图片")
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error("图片不能大于5M")
        }
        return isJpgOrPng && isLt5M;
    }
}
