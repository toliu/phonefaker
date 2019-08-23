import React from "react";

import {storiesOf} from "@storybook/react";

import {Chat} from "../src/components/wechat/chat/chat";

storiesOf("微信", module)
    .add("对话", () => <Chat/>);

