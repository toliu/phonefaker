import * as React from "react";
import {BuildHTMLTitle} from "../../utils";

export class WechatChatPage extends React.Component<{}, {}> {

    public componentDidMount() {
        document.title = BuildHTMLTitle(["微信", "聊天制作"])
    }

    public render(): React.ReactElement {
        return (
            <div>
                chat
            </div>
        );
    }

}
