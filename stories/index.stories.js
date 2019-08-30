import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';

import {Chat} from "../src/components/wechat/chat/chat";
import {ChatController} from "../src/components/wechat/controllers/chat";

import avatar1 from "../src/components/wechat/chat/assets/img/liu_avatar.jpg";
import avatar2 from "../src/components/wechat/chat/assets/img/zhang_avatar.jpg";
import {FixedPhone} from "../src/components/phone/fixedphone";

const phoneContent = `
To create an environment with multiple-storage back ends, you must specify a volume type. The API spawns Block Storage volume

back ends as children to cinder-volume, and keys them from a unique queue. The API names the back ends cinder-volume.HOST

BACKEND. For example, cinder-volume.ubuntu.lvmdriver. When you create a volume, the scheduler chooses an appropriate back end

for the volume type to handle the request.
To create an environment with multiple-storage back ends, you must specify a volume type. The API spawns Block Storage volume

back ends as children to cinder-volume, and keys them from a unique queue. The API names the back ends cinder-volume.HOST

BACKEND. For example, cinder-volume.ubuntu.lvmdriver. When you create a volume, the scheduler chooses an appropriate back end

for the volume type to handle the request.
To create an environment with multiple-storage back ends, you must specify a volume type. The API spawns Block Storage volume

back ends as children to cinder-volume, and keys them from a unique queue. The API names the back ends cinder-volume.HOST

BACKEND. For example, cinder-volume.ubuntu.lvmdriver. When you create a volume, the scheduler chooses an appropriate back end

for the volume type to handle the request.

BACKEND. For example, cinder-volume.ubuntu.lvmdriver. When you create a volume, the scheduler chooses an appropriate back end

for the volume type to handle the request.

BACKEND. For example, cinder-volume.ubuntu.lvmdriver. When you create a volume, the scheduler chooses an appropriate back end

for the volume type to handle the request.
`;

storiesOf("手机", module)
    .add("空手机", () => <FixedPhone/>)
    .add("有控制器手机", () => <FixedPhone controllerPanel={<div>面板</div>}/>)
    .add("有输入手机", () => <FixedPhone controllerPanel={<div>面板</div>} controllerInput={<div>输入窗口</div>}/>)
    .add("按钮自定义", () => <FixedPhone button={{
        text: "自定义", onClick: action("button click")
    }}/>);

storiesOf("微信", module)
    .add("对话", () => {
        const myAvatarUrl = avatar1;
        const other = avatar2;

        const messages = [
            {
                mine: true,
                isText: true,
                content: "float向右",
            },
            {
                mine: true,
                isImage: true,
                imagePath: "data:image/jpeg;base64,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",
            },
            {
                mine: false,
                isText: true,
                content: "float向左",
            },
            {
                mine: false,
                isImage: true,
                imagePath: "data:image/jpeg;base64,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",
            },
            {
                mine: true,
                isText: true,
                content: "短对话",
            },
            {
                mine: false,
                isText: true,
                content: "回短对话",
            },
            {
                isDate: true,
                date: new Date(2019, 8, 12, 11, 2, 17),
            },
            {
                mine: true,
                isText: true,
                content: "CSS元素选择器(也称为类型选择器)通过node节点名称匹配元素. 因此,在单独使用时,寻找特定类",
            },
            {
                isDate: true,
            },
            {
                mine: false,
                isText: true,
                content: "CSS元素选择器(也称为类型选择器)通过node节点名称匹配元素. 因此,在单独使用时,寻找特定类",
            },
            {
                mine: true,
                isVoice: true,
                voiceLength: 10,
            },
            {
                mine: false,
                isVoice: true,
                voiceLength: 50,
            },

        ];
        return <Chat
            user={"张学友❥"} messages={messages}
            newMsgRecipient={action("recive")} myAvatarURL={myAvatarUrl} otherAvatarURL={other}/>
    })
    .add("控制聊天", () => <ChatController/>);

