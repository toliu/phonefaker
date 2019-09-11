import React from "react";

import {storiesOf} from "@storybook/react";

import {FriendCircle} from "../src/components/wechat/friend-cricle/friend-cricle";

storiesOf("朋友圈", module)
    .add("基础", () => {
        return <FriendCircle/>
    });