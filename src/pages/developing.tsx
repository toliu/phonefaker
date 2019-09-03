import * as React from "react";

import {ClimbingBoxLoader} from "react-spinners";

export class Developing extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <div style={{textAlign: "center", padding: "20% 20%"}}>
                <ClimbingBoxLoader size={20}/>
                <span style={{fontSize: "50px"}}>努力开发中...</span>
            </div>
        );
    }

}
