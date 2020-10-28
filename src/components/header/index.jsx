/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './index.less'
import {reqWeather} from '../../api/index'
import {Divider} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import {formatDateTime} from '../../utils/dateUtils'
import {DATETIME_FORMAT} from '../../constants'
import moment from 'moment'
export default class Header extends Component {
    state={
        data:{},
        user:{},
        currentTime:Date.now()
    }
    /**
     * 第一次render()之后执行一次
     * 一般在此执行异步操作，发ajax请求/启动定时器
     */
    componentDidMount(){
        reqWeather('上海').then(res=>{
            console.log('res:',res)
            if(res){
                this.setState({
                    data:res
                })
            }
        })
        setInterval(()=>this.setState({currentTime:Date.now()}),1000);
    }
    
    render() {
        const {dayPictureUrl,weather,temperature}=this.state.data
        const {currentTime}=this.state
        const {username}=memoryUtils.user
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <a href='javascript:(0)'>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>{formatDateTime(currentTime,'YYYY-MM-DD  hh:mm:ss')}</span>
                        <img src={dayPictureUrl} alt='weather'/>
                        <span>{weather}<Divider type="vertical"/>{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}
