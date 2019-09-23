import React from "react";

import {storiesOf} from "@storybook/react";

import {WechatChat} from "../src/components/wechat/chat/chat";

import avatar1 from "../src/assets/img/wechat-default-avatar1.jpg"
import avatar2 from "../src/assets/img/wechat-default-avatar2.jpg"

storiesOf("微信聊天", module)
    .add("文本对话", () => {
        const textMessages = [];
        const shortContent = "可以[kiss]简便";
        const longContent = "[kiss]可以简便、完整、响应式地实现各种页面布局。目前[kiss]，它已经得到了所有[kiss]浏览器的支持，这意味着，现在就能很安全地使用这项功能。[kiss]";
        for (let index = 0; index <= 10; index++) {
            textMessages.push({
                kind: "text",
                name: index % 2 === 0 ? "时光" : "[kiss] 汤圆。",
                avatar: index % 2 === 0 ? avatar1 : avatar2,
                rejected: index % 3 === 0,
                unread: false,
                content: index % 3 === 0 ? shortContent : longContent + index,
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={textMessages}
        />
    })
    .add("语音对话", () => {
        const voiceMessages = [];
        for (let index = -1; index <= 90; index++) {
            voiceMessages.push({
                kind: "voice",
                name: index % 2 === 0 ? "时光" : "[kiss] 汤圆。",
                avatar: index % 2 === 0 ? avatar1 : avatar2,
                rejected: index % 6 === 0,
                unread: index % 5 === 0,
                voice: index,
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={voiceMessages}
        />
    });
