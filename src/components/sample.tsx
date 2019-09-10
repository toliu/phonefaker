import * as React from "react";
import {Tabs} from 'antd';

import styles from "../assets/css/controller_sample.module.css";

const {TabPane} = Tabs;

type TabItem = {
    label: string,
    onClick: () => void;
};

interface SampleProps {
    tabs: { [key: string]: TabItem[] };
}

export class Sample extends React.Component<SampleProps, {}> {
    public render(): React.ReactElement {
        return (
            <div className={styles.sample}>
                <Tabs defaultActiveKey="1" tabPosition={"top"} style={{height: 220}}>
                    {Object.keys(this.props.tabs).map(key => {
                        const panels = this.props.tabs[key];
                        return (
                            <TabPane tab={key} key={key}>
                                {panels.map((item, index) => {
                                    return (
                                        <div
                                            className={styles.panel}
                                            key={key + "_" + index}
                                            onClick={item.onClick}
                                            title={"点击使用"}
                                        >
                                            <span>{item.label}</span>
                                        </div>
                                    );
                                })}
                            </TabPane>
                        );
                    })}
                </Tabs>
            </div>
        );
    }

}
