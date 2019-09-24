import "antd/dist/antd.css";

import * as React from "react";
import {Route, HashRouter, Switch, Redirect} from "react-router-dom";

import {Developing} from "./developing";
import {Home} from "./home";
import {Site, SiteKeys} from "../components/site";

import {WechatChatPage} from "./wechat/chat";

export class Index extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        return (
            <HashRouter>
                <Site>
                    <Switch>
                        <Route exact={true} path={SiteKeys.Home} component={Home}/>
                        <Route exact={true} path={SiteKeys.WeChatChat} component={WechatChatPage}/>
                        <Route exact={true} path={SiteKeys.WeChatFriends} component={Developing}/>
                        <Route exact={true} path={SiteKeys.WeiboChat} component={Developing}/>
                        <Route exact={true} path={SiteKeys.WeiboNews} component={Developing}/>
                        <Route exact={true} path={SiteKeys.QQChat} component={Developing}/>
                        <Route exact={true} path={SiteKeys.QQZone} component={Developing}/>
                        <Route exact={true} path={SiteKeys.ZhiHu} component={Developing}/>
                        <Route exact={true} path={SiteKeys.Twitter} component={Developing}/>
                        <Route exact={true} path={SiteKeys.FaceBook} component={Developing}/>
                        <Redirect to={SiteKeys.Home}/>
                    </Switch>
                </Site>
            </HashRouter>

        );
    }
}