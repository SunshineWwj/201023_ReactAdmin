/* eslint-disable jsx-a11y/alt-text */

/**
 * 登录的路由组件
 */
import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
export default class Login extends Component {
     onFinish = async (values) => {
         //校验通过，请求登录
        const {username,password}=values
        // 1.ajax优化前的写法
        // reqLogin(username,password).then(res=>{
        //     console.log('成功了：',res.data)
        // }).catch(error=>{
        //     console.log('失败了：',error)
        // })
        
        // 2.使用async和await改写
        // try {
        //     const response=await reqLogin(username,password);
        //     console.log('请求成功：',response.data)
        // } catch (error) {
        //     console.log('请求出错了：',error)
        // }

        //3.ajax优化后的写法（请求失败直接报错）
        const respone=await reqLogin(username,password);
        console.log('请求成功了：',respone.data)

      };
      formRef = React.createRef();
      componentDidMount(){
          console.log('formRef:',this.formRef)
          this.formRef.current.setFieldsValue({
                username: 'Bamboo',
            });
        }
      validatePwd=(rule,value)=>{
          if(!value){
              return Promise.reject('密码不能为空');
          }else if(value.length<4){
            return Promise.reject('密码长度不能小于4');
          }else if(value.length>12){
            return Promise.reject('密码长度不能大于12');
          }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            return Promise.reject('密码必须是英文数字或下划线组成');
          }else{
              return Promise.resolve()
          }
      }
    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alert='logo'/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section  className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                     ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { min: 4, message: '用户名长度不能小于4位' },
                            { max: 12, message: '用户名长度不能大于12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字或下划线组成' },
                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        initialValue={'admin'}
                        rules={
                            [
                                // { required: true, message: '请输入密码' },
                                {validator:this.validatePwd}
                            ]
                            }>
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/**
 * async 和 await
    1》作用
        简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数
        以 同步 编码方式（没有回调函数了） 实现异步流程
    2》哪里写await？
        在返回promise的表达式左侧写await：不要promise，想要promise异步执行的成功的value数据
    3》哪里写async？
        await所在函数（最近的）定义的左侧 写async
 */