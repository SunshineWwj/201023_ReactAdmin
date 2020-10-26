/**
 * 后台管理的路由组件
 */
import React, { Component } from 'react'
import  memoryUtils from '../../utils/memoryUtils'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user=memoryUtils.user
        console.log('user:',user)
        //如果内存没有存储user ==>表示当前没有登录
        if(!user || !user._id){
            //自动跳转到登录(在render()中)
            return <Redirect to='/login'/>
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider>Sider</Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
        )
    }
}
