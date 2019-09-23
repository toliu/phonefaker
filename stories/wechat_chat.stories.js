import React from "react";

import {storiesOf} from "@storybook/react";

import {WechatChat} from "../src/components/wechat/chat/chat";

import avatar1 from "../src/assets/img/wechat-default-avatar1.jpg"
import avatar2 from "../src/assets/img/wechat-default-avatar2.jpg"

import pic1 from "./picture1.png";
import pic2 from "./picture2.png";
import pic3 from "./picture3.jpg";
import pic4 from "./picture4.jpg";

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
    })
    .add("红包消息", () => {
        let messages = [];
        const title = "恭喜发财，大吉大利。祝贺";
        for (let index = 1; index <= title.length; index++) {
            messages.push({
                kind: "redPackage",
                name: index % 2 === 0 ? "时光" : "[kiss] 汤圆。",
                avatar: index % 2 === 0 ? avatar1 : avatar2,
                rejected: index % 2 === 0,
                unread: index % 3,
                title: title.slice(0, index),
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={messages}
        />
    })
    .add("转账消息", () => {
        let messages = [];
        const title = "下季度房租+物业费";
        for (let index = 1; index <= title.length; index++) {
            messages.push({
                kind: "exchange",
                name: index % 2 === 0 ? "时光" : "[kiss] 汤圆。",
                avatar: index % 2 === 0 ? avatar1 : avatar2,
                rejected: index % 2 === 0,
                unread: index % 3,
                money: index,
                postscript: title.slice(0, index),
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={messages}
        />
    })
    .add("图片消息", () => {
        const messages = [];
        const pictures = [pic1, pic2, pic3, pic4];
        for (let index = 1; index <= 15; index++) {
            messages.push({
                kind: "image",
                name: index % 2 === 0 ? "时光" : "[kiss] 汤圆。",
                avatar: index % 2 === 0 ? avatar1 : avatar2,
                rejected: index % 6 === 0,
                unread: index % 5 === 0,
                src: pictures[index % pictures.length],
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={messages}
        />
    })
    .add("系统时间", () => {
        const now = new Date();
        const messages = [];
        for (let index = 0; index <= 15; index++) {
            messages.push({
                kind: "datetime",
                datetime: new Date(now.getTime() - index * 3600000 * 24 * 2),
            })
        }
        return <WechatChat
            userName={"时光"}
            userAvatar={avatar1}
            chatterName={"[kiss] 汤圆。"}
            chatterAvatar={avatar2}
            messages={messages}
        />
    });
