/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import {Button, message} from 'antd';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

/**
 * 应用的根组件
 */
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*switch 只匹配其中一个 */}
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            
            </BrowserRouter>
        );
    }
}
