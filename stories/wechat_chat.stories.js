import React from "react";

import {storiesOf} from "@storybook/react";

import {FixedChat} from "../src/components/wechat/chat/fixedChat";

import default_avatar1 from "../src/assets/img/default_avatar1.jpg";

storiesOf("微信对话", module)
    .add("文本和语音", () => {
        const messages = [
            {
                kind: "text", avatar: default_avatar1, user: "时光", content: "已读消息已读消息已读消息已读消息", unread: false,
            },
            {
                kind: "text", avatar: default_avatar1, user: "机器", content: "已读消息已读消息已读消息已读消息", unread: false,
            },
            {
                kind: "text", avatar: default_avatar1, user: "时光", content: "未读消息未读消息未读消息未读消息", unread: true,
            },
            {
                kind: "text", avatar: default_avatar1, user: "机器", content: "未读消息未读消息未读消息未读消息", unread: true,
            },
            {
                kind: "text", avatar: default_avatar1, user: "时光", content: "带表情消[kissing_heart]带表情", unread: true,
            },
            {
                kind: "text", avatar: default_avatar1, user: "机器", content: "带表情消[kissing_heart]带表情", unread: true,
            },
            {
                kind: "voice", avatar: default_avatar1, user: "时光", voice: 10, unread: false,
            },
            {
                kind: "voice", avatar: default_avatar1, user: "机器", voice: 60, unread: false,
            },
            {
                kind: "voice", avatar: default_avatar1, user: "时光", voice: 10, unread: true,
            },
            {
                kind: "voice", avatar: default_avatar1, user: "机器", voice: 60, unread: true,
            },
        ];
        return <FixedChat otherUserAvatar={default_avatar1} otherUserName={"机器"} userAvatar={default_avatar1} userName={"时光"} messages={messages}/>
    })
    .add("图片信息", () => {
        const messages = [{
            kind: "image", avatar: default_avatar1, user: "时光", src: default_avatar1, unread: false,
        },
            {
                kind: "image", avatar: default_avatar1, user: "机器", src: default_avatar1, unread: false,
            },
        ];
        return <FixedChat
            otherUserAvatar={default_avatar1}
            otherUserName={"机器"}
            userAvatar={default_avatar1}
            userName={"时光"}
            messages={messages}
        />
    })
    .add("系统消息", () => {
        const now = new Date();
        const messages = [
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24 * 3) * 1000),
            },
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24) * 1000),
            },
            {
                kind: "alreadyFriend", who: "机器",
            },
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24 * 7) * 1000),
            },
            {
                kind: "date", time: now,
            },
            {
                kind: "exchangeReceived", avatar: default_avatar1, user: "时光", unread: false, money: 70,
            },
            {
                kind: "exchangeReceived", avatar: default_avatar1, user: "机器", unread: false, money: 10,
            },
            {
                kind: "redPackageReceived", receiver: "机器", sender: "时光",
            },
        ];
        return <FixedChat otherUserAvatar={default_avatar1} otherUserName={"机器"} userAvatar={default_avatar1} userName={"时光"} messages={messages}/>
    })
    .add("红包与转账", () => {
        const messages = [
            {
                kind: "redPackage", avatar: default_avatar1, user: "时光", unread: false, title: "恭喜发财，大吉大利", received: false,
            },
            {
                kind: "redPackage", avatar: default_avatar1, user: "机器", unread: false, title: "恭喜发财，大吉大利打理打理", received: true,
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "时光", unread: true, money: 1, title: "短文本",
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "时光", unread: true, money: 10, title: "长文本长文本长文本长",
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "时光", unread: false, money: 10, title: "长文本长文本长文本长",
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "机器", unread: true, money: 1, title: "短文本",
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "机器", unread: true, money: 21, title: "长文本长文本长文本长",
            },
            {
                kind: "exchange", avatar: default_avatar1, user: "机器", unread: false, money: 70, title: "长文本长文本长文本长",
            },
        ];
        return <FixedChat otherUserAvatar={default_avatar1} otherUserName={"机器"} userAvatar={default_avatar1} userName={"时光"} messages={messages}/>
    });
