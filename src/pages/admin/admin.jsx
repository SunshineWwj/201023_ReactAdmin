/**
 * 后台管理的路由组件
 */
import React, { Component } from 'react'
import  memoryUtils from '../../utils/memoryUtils'
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user=memoryUtils.user
        //如果内存没有存储user ==>表示当前没有登录
        if(!user || !user._id){
            //自动跳转到登录(在render()中)
            return <Redirect to='/login'/>
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{margin:20,  backgroundColor:'#fff'}}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/bar' component={Bar}/>
                                <Route path='/line' component={Line}/>
                                <Route path='/pie' component={Pie}/>
                                <Redirect to='/home'/>{/**找不到路由就去/home*/}
                            </Switch>
                        </Content>
                        <Footer style={{color:'#ccc',textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
                    </Layout>
                </Layout>
        )
    }
}
