import React from "react";

import {storiesOf} from "@storybook/react";

import {FriendCircle} from "../src/components/wechat/friend-cricle/friend-cricle";

import defaultAvatar from "../src/assets/img/sample/wechat_chat_bus_avatar.jpg";

storiesOf("朋友圈", module)
    .add("文本朋友圈", () => {
        const now = new Date();
        const messages = [
            {
                userName: "琳琳",
                userAvatar: defaultAvatar,
                message: "知秋凤凰新派中式婚礼展示秀《旖旎》知秋凤凰：你身边婚礼庆典的策划执行专家",
                like: ["朋友A", "朋友B", "朋友C", "朋友D", "朋友E"],
                comments: [
                    {
                        by: "朋友A",
                        to: "琳琳",
                        content: "有时，动画播放过程中，会突然停止。这时，默认行为是跳回到动画的开始状态。",
                    },
                    {
                        by: "琳琳",
                        to: "朋友A",
                        content: "上面的代码指定，没有鼠标没有悬停时，动画状态是暂停；一旦悬停，动画状态改为继续播放。效果如下。",
                    }
                ],
                timestamp: now,
            }
        ];
        return <FriendCircle messages={messages}/>
    });