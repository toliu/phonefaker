import "antd/dist/antd.css";

import * as React from "react";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";

import {Developing} from "./developing";
import {Chat} from "./wechat/chat";
import {Site, SiteKeys} from "../components/site";

export class Index extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <BrowserRouter>
                <Site>
                    <Switch>
                        <Route exact={true} path={SiteKeys.Home} component={Developing}/>
                        <Route exact={true} path={SiteKeys.WeChatChat} component={Chat}/>
                        <Route exact={true} path={SiteKeys.WeChatFriends} component={Developing}/>
                        <Redirect to={SiteKeys.Home}/>
                    </Switch>
                </Site>
            </BrowserRouter>

        );
    }
}