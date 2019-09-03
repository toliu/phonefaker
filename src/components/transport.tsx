import * as React from "react";

import mailPicture from "./assets/img/mail.png";
import cloudPicture from "./assets/img/cloud.png";
import knifePicture from "./assets/img/knife.png";
import axePicture from "./assets/img/axe.png";

import styles from "./assets/css/transport.module.css";

interface TransportProps {
    toRight: boolean;
}

export class Transport extends React.Component<TransportProps, {}> {
    private readonly pictures: string[];

    constructor(props: TransportProps) {
        super(props);
        this.pictures = [mailPicture, cloudPicture, knifePicture, axePicture]
    }

    public render(): React.ReactElement {


        const index = Math.floor(Math.random() * this.pictures.length);
        const pic = this.pictures[index];

        const ref = React.createRef<HTMLImageElement>();
        const top: number = Math.random() * 80;
        setTimeout(() => {
            if (ref.current) {
                ref.current.remove()
            }
        }, 1000);
        return (
            <img
                src={pic}
                alt={"mail"}
                className={this.props.toRight ? styles.right : styles.left}
                style={{top: top + "%"}}
                ref={ref}
            />
        );
    }
}
