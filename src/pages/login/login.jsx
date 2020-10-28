/* eslint-disable jsx-a11y/alt-text */

/**
 * 登录的路由组件
 */
import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import  memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
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
        const result=await reqLogin(username,password);//{status:0,data:user} 或者 {status:1,msg:'xxx'}
        if(result.status===0){//登录成功
            const user=result.data.user;
            memoryUtils.user=user   //用户信息保存在内存中
            storageUtils.saveUser(user) //用户信息保存到local中
            message.success('登录成功');
            this.props.history.replace('/admin')//跳转管理界面 (用replace表示不需要再回退到登录)
        }else{//登录失败
            message.error(result.msg);
            this.props.history.replace('/admin')
        }


        //============有接口了可删除-start===================
        // const user={_id:1,username,password}
        // memoryUtils.user=user
        // storageUtils.saveUser(user)
        // this.props.history.replace('/')
        //============有接口了可删除-end===================

      };
      formRef = React.createRef();
      componentDidMount(){
        //   console.log('formRef:',this.formRef)
        //   this.formRef.current.setFieldsValue({
        //         username: 'Bamboo',
        //     });
        }
      validatePwd = (rule,value) => {
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
        //如果用户已经登录，自动跳转到管理界面
        const user=memoryUtils.user
        if(user && user._id){
            return <Redirect to='/'/>
        }
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
                        initialValue='admin'
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