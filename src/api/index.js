/**
 * 要求：能根据接口文档 定义 接口请求
 * 包含应用中所有 接口请求函数 的模块
 * 每个函数的返回值都是promise对象
 */
import ajax from './ajax'
//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')