import "antd/dist/antd.css";

import * as React from "react";
import {Route, HashRouter, Switch, Redirect} from "react-router-dom";

import {Developing} from "./developing";
import {Home} from "./home";
import {Chat} from "./wechat/chat";
import {Site, SiteKeys} from "../components/site";
import {Friend} from "./wechat/friend";

export class Index extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <HashRouter>
                <Site>
                    <Switch>
                        <Route exact={true} path={SiteKeys.Home} component={Home}/>
                        <Route exact={true} path={SiteKeys.WeChatChat} component={Chat}/>
                        <Route exact={true} path={SiteKeys.WeChatFriends} component={Friend}/>
                        <Redirect to={SiteKeys.Home}/>
                    </Switch>
                </Site>
            </HashRouter>

        );
    }
}