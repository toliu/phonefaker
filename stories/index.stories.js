import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';

import {FixedPhone} from "../src/components/phone/fixedphone";
import {FixedChat} from "../src/components/wechat/chat/fixedChat";
import {Index} from "../src/pages";

import default_avatar1 from "../src/assets/img/default_avatar1.jpg";

storiesOf("手机", module)
    .add("空手机", () => <FixedPhone/>)
    .add("有控制器手机", () => <FixedPhone controllerPanel={<div>面板</div>}/>)
    .add("有输入手机", () => <FixedPhone controllerPanel={<div>面板</div>} controllerInput={<div>输入窗口</div>}/>)
    .add("按钮自定义", () => <FixedPhone button={{
        text: "自定义", onClick: action("button click")
    }}/>);

storiesOf("微信", module)
    .add("对话", () => {
        const now = new Date();
        const messages = [
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24 * 3) * 1000),
            },
            {
                kind: "alreadyFriend", who: "机器",
            },
            {
                kind: "text", avatar: default_avatar1, user: "时光", content: "已读消息已读消息已读消息已读消息", unread: false,
            },
            {
                kind: "redPackage", avatar: default_avatar1, user: "时光", unread: false, title: "恭喜发财，大吉大利",
            },
            {
                kind: "redPackageReceived", who: "机器",
            },
            {
                kind: "redPackage", avatar: default_avatar1, user: "机器", unread: false, title: "恭喜发财，大吉大利打理打理",
            },
            {
                kind: "text", avatar: default_avatar1, user: "机器", content: "已读消息已读消息已读消息已读消息", unread: false,
            },
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24 * 7) * 1000),
            },
            {
                kind: "text", avatar: default_avatar1, user: "时光", content: "未读消息未读消息未读消息未读消息", unread: true,
            },
            {
                kind: "date", time: new Date(now.getTime() - (3600 * 24) * 1000),
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
                kind: "date", time: now,
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
            }
        ];
        return <FixedChat
            otherUserAvatar={default_avatar1}
            otherUserName={"机器"}
            userAvatar={default_avatar1}
            userName={"时光"}
            messages={messages}
        />
    });

storiesOf("首页", module)
    .add("page", () => <Index/>);
