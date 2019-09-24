import * as React from "react";

import {DateTimeMessage} from "./types";
import {MessageWrap} from "./wrap";

import styles from "../../../../assets/css/wechat-chat-message.module.css";

export class Datetime extends React.Component<{
    msg: DateTimeMessage;
}, {}> {
    public render(): React.ReactElement {
        const weekdays: string[] = [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
        ];
        const day: number = 3600 * 24;
        const time: Date = this.props.msg.datetime;
        const now: Date = new Date();
        const secondDiff: number = (now.getTime() - time.getTime()) / 1000;
        let timeString: string = (time.getHours() > 9 ? time.getHours() + "" : "0" + time.getHours()) + ":" + (time.getMinutes() > 9 ? time.getMinutes() + "" : "0" + time.getMinutes());
        if (secondDiff < 60) {
            timeString = "刚刚";
        } else if (secondDiff < day) {
            //    nothing todo
        } else if (secondDiff < 2 * day) {
            timeString = "昨天 " + timeString;
        } else if (secondDiff < 7 * day) {
            timeString = weekdays[time.getDay()] + " " + timeString;
        } else if (secondDiff < 14 * day) {
            timeString = time.getMonth() + "月" + time.getDate() + "日 " + timeString;
        } else {
            timeString = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDate() + "日 " + timeString;
        }
        return (
            <MessageWrap>
                <div datatype={"system"} className={styles.datetime}>
                    <p>{timeString}</p>
                </div>
            </MessageWrap>
        );
    }

}
