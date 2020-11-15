/**
 * 要求：能根据接口文档 定义 接口请求
 * 包含应用中所有 接口请求函数 的模块
 * 每个函数的返回值都是promise对象
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd';
//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
const BASE_URL = '/api';
export const reqLogin = (username, password) => ajax(`${BASE_URL}/login`, {username,
    password}, 'POST');

//添加用户
export const reqAddUser = user => ajax(`${BASE_URL}/manage/user/add`, user, 'POST');

//获取一级/二级分类的列表
export const reqCategories = () => ajax(`${BASE_URL}/manage/category/list`);

//获取二级分类的列表
export const reqCategoryDetail = id => ajax(`${BASE_URL}/manage/category/list/${id}`,);

//添加分类
export const addCategory = (parentId, categoryName) => ajax(`${BASE_URL}/manage/category/add`, {parentId,
    categoryName}, 'POST');

//更新分类
export const updateCategory = ({categoryId, categoryName}) => ajax(`${BASE_URL}/manage/category/update`, {categoryId,
    categoryName}, 'POST');

//jsonp请求的接口请求函数
export const reqWeather = city => new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
        //如果成功
        if(!err && data.status === 'success') {
            const {dayPictureUrl, weather, temperature} = data.results[0].weather_data[0];
            resolve({dayPictureUrl,
                weather,
                temperature});
        } else
            //失败
            message.error('获取天气信息失败');
    });
});
