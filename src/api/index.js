/**
 * 要求：能根据接口文档 定义 接口请求
 * 包含应用中所有 接口请求函数 的模块
 * 每个函数的返回值都是promise对象
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
const BASE_URL='/api'
export const reqLogin = (username,password) => ajax(BASE_URL+'/login',{username,password},'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE_URL+'/manage/user/add',user,'POST')

//jsonp请求的接口请求函数
export const reqWeather = (city) => {
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data )=>{
            console.log('jsonp():',err,data)
            //如果成功
            if(!err && data.status==='success'){
                const {dayPictureUrl,weather,temperature} =data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather,temperature})
            }else{
                //失败
                message.error('获取天气信息失败')
            }
        })
    })
    
}