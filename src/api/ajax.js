/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库(axios请求返回的就是promise对象)
 * 函数的返回值是promise对象
 * 
 * 优化1：统一处理请求异常？
 *      在外层包一个自己创建的promise对象
 *      在请求出错时，补reject(error)，而是显示错误信息
 * 优化2：异步得到不是response，而是response.data
 *      在请求成功resolve时，reslove(response.data)
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){

    return new Promise((resolve,reject)=>{
        let promise
        // 1.执行异步ajax请求
        if(type==='GET'){ 
            promise= axios.get(url,{   //发送get请求
                params:data   // 配置对象  指定请求参数
            })
        }else{
            promise= axios.post(url,data) //发送post请求
        }
        // 2.如果成功了，调用resolve(value)
        promise.then(response=>{
            resolve(response.data) //成功返回data

            // 3.如果失败了，不调用reject(reason)，而是提示错误信息
        }).catch(err=>{
            //reject(err)
            message.error('请求出错了:'+err.message)
        })
    })
}




//请求登录接口
// ajax('/login',{username:'admin',password:'admin'},'POST').then()
//添加用户
//  ajax('/manage/user/add',{username:'admin',password:'admin',phone:'12345678'},'POST').then()