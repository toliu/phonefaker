import React from "react";

import {storiesOf} from "@storybook/react";

import {IPhone} from "../src/components/phone/phone";


storiesOf("苹果", module)
    .add("空手机", () => <IPhone/>);