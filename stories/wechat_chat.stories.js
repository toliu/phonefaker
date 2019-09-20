import React from "react";

import {storiesOf} from "@storybook/react";

import {WechatChat} from "../src/components/wechat/chat/chat";

import avatar1 from "../src/assets/img/wechat-default-avatar1.jpg"
import avatar2 from "../src/assets/img/wechat-default-avatar2.jpg"

storiesOf("微信聊天", module)
    .add("文本与语音", () => {
        const messages = [
            {
                kind: "voice",
                name: "[kiss] 汤圆。",
                avatar: avatar2,
                rejected: false,
                unread: false,
                voice: 10,
            },
            {
                kind: "voice",
                name: "时光",
                avatar: avatar1,
                rejected: false,
                unread: false,
                voice: 10,
            },
            {
                kind: "voice",
                name: "[kiss] 汤圆。",
                avatar: avatar2,
                rejected: false,
                unread: false,
                voice: 60,
            },
            {
                kind: "voice",
                name: "时光",
                avatar: avatar1,
                rejected: false,
                unread: false,
                voice: 60,
            },
            {
                kind: "text",
                name: "时光",
                avatar: avatar1,
                rejected: false,
                unread: false,
                content: "减肥餐嘛",
            },
            {
                kind: "text",
                name: "[kiss] 汤圆。",
                avatar: avatar2,
                rejected: false,
                unread: false,
                content: "[kiss]可以简便",
            },
            {
                kind: "text",
                name: "时光",
                avatar: avatar1,
                rejected: false,
                unread: false,
                content: "[kiss]可以简便、完整、响应式地实现各种页面布局。目前[kiss]，它已经得到了所有[kiss]浏览器的支持，这意味着，现在就能很安全地使用这项功能。[kiss]",
            },
            {
                kind: "text",
                name: "[kiss] 汤圆。",
                avatar: avatar2,
                rejected: false,
                unread: false,
                content: "[kiss]可以简便、完整、响应式地实现各种页面布局。目前[kiss]，它已经得到了所有[kiss]浏览器的支持，这意味着，现在就能很安全地使用这项功能。[kiss]",
            },
        ];

        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={messages}
        />
    });
