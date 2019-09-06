import {UploadChangeParam} from "antd/es/upload";
import * as React from "react";
import moment from "moment";
import {DatePicker, Modal, TimePicker, Icon, Input, Upload, message} from "antd";

import {InputPanel} from "./bottom-panel";

import timeIcon from "../../../assets/img/wechat_time_input.png";
import alreadyFriendIcon from "../../../assets/img/already_friend_icon.png";
import backgroundIcon from "../../../assets/img/wechat_backgroud_input.png";
import redPackageIcon from "../../../assets/img/wechat-red-package.png";

import styles from "../../../assets/css/wechat_addition.module.css";

interface AdditionInputProps {
    onBack: () => void;
    selectTime: (t: Date) => void;
    alreadyFriend: () => void;
    backgroundImage: (src: string) => void;
    sendRedPackage: (title: string) => void;
}

interface AdditionInputStats {
    timeInputVisible: boolean;
    selectedTime: Date;

    backgroundInputVisible: boolean;
    selectedBackground: string;

    redPackageInputVisible: boolean;
    inputRedPackageTitle: string;
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
            inputRedPackageTitle: "恭喜发财，大吉大利"
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
