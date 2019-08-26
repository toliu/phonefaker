import * as React from "react";

import styles from "../assets/css/message.module.css";

interface DateProps {
    date?: Date;
}

export class DateTime extends React.Component<DateProps, {}> {
    public render(): React.ReactElement {
        let date = this.props.date;
        if (!date) {
            date = new Date();
        }
        const weekChinese: string[] = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const day = 3600 * 24;
        const month = 30 * day;
        const year = 12 * month;

        let timeString: string = date.getHours() + ":" + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
        const diff: number = (date.getTime() / 1000) - (new Date().getTime() / 1000);
        if (diff > year) {
            timeString = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日 " + timeString;
        } else if (diff > day) {
            timeString = weekChinese[date.getDay()] + " " + timeString;
        }

        return (
            <div className={styles.date}>
                <span style={{width: "90%"}}><p>{timeString}</p></span>
            </div>
        );
    }

}
