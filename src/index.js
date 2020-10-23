/**
 * 入口js
 */
import React  from 'react'
import ReactDOM from 'react-dom' //渲染页面 必须引入react-dom
import App from './App'
import 'antd/dist/antd.css'

//将App组件渲染到index页面的div上
ReactDOM.render(<App/>,document.getElementById('root'))