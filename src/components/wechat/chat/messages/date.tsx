import * as React from "react";

import {Message} from "./msg";

import styles from "../../../../assets/css/msg.module.css";

const Day: number = 3600 * 24;
const Weekend: number = Day * 7;

const Weekends: string[] = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
];

interface DateMessageProps {
    onDelete: () => void;
    time: Date;
}

export class DateMessage extends React.Component<DateMessageProps, {}> {
    public render(): React.ReactElement {
        const time: Date = this.props.time;
        const hours: number = time.getHours();
        const minutes: number = time.getMinutes();
        let dateString: string = (hours > 9 ? hours + "" : "0" + hours) + ":" + (minutes > 9 ? minutes + "" : "0" + minutes);
        const now: Date = new Date();
        const diff: number = (now.getTime() - time.getTime()) / 1000;
        if (diff < Day) {
            if (now.getDate() > time.getDate()) {
                dateString = "昨天 " + dateString;
            }
        } else if (diff < Weekend) {
            if (now.getDate() - time.getDate() === 1) {
                dateString = "昨天 " + dateString;
            } else {
                dateString = Weekends[time.getDay()] + " " + dateString;
            }
        } else {
            dateString = time.getFullYear() + "年" + time.getMonth() + "月" + time.getDate() + "日 " + dateString;
        }
        return (
            <Message onDelete={this.props.onDelete} isSystem={true}>
                <span className={styles.time}>{dateString}</span>
            </Message>
        );
    }

}
