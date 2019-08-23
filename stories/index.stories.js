import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';

import {Phone} from "../src/components/phone/phone";

storiesOf("手机", module)
    .add("手机", () => <Phone button={{text: "打印", onClick: action("打印成功")}}></Phone>);

