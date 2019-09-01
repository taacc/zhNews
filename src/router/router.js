import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
class Router extends React.Component {
    render() {
        let routes = this.props.routes
        // 找出重定向
        let redirectArr = routes.filter(item => {
            return item.redirect
        })
        // 将重定向渲染成dom
        let redirectDom = redirectArr.map((item, i) => {
            return <Redirect key={i} from={item.path} to={item.redirect} />;
        });

        //2:将routes数组去掉重定向
        routes = routes.filter((item) => {
            return !item.redirect;
        });
        return <Switch>
            {
                routes.map((item, index) => {
                    return <Route
                        key={index}
                        path={item.path}
                        render={(props) => {
                            return <item.component child={item.children} {...props} />;
                        }
                        } />;
                }).concat(redirectDom)
            }
        </Switch>
    }
}
export default Router