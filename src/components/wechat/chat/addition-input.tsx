import * as React from "react";
import moment from "moment";
import {DatePicker, Modal, TimePicker} from "antd";

import {InputPanel} from "./bottom-panel";

import timeIcon from "../../../assets/img/wechat_time_input.png";
import alreadyFriendIcon from "../../../assets/img/already_friend_icon.png";

import styles from "../../../assets/css/wechat_addition.module.css";

interface AdditionInputProps {
    onBack: () => void;
    selectTime: (t: Date) => void;
    alreadyFriend: () => void;
}

interface AdditionInputStats {
    timeInputVisible: boolean;
    selectedTime: Date;
}


export class AdditionInput extends React.Component<AdditionInputProps, AdditionInputStats> {
    constructor(props: AdditionInputProps) {
        super(props);
        this.state = {
            timeInputVisible: false,
            selectedTime: new Date(),
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

                </div>
            </InputPanel>
        );
    }
}
