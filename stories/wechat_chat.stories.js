import React from "react";

import {storiesOf} from "@storybook/react";

import {WechatChat} from "../src/components/wechat/chat/chat";

storiesOf("微信聊天", module)
    .add("文本与语音", () => {
        return <WechatChat title={"[kiss] 汤圆。"}/>
    });
