/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './index.less'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <a href='javascript:(0)'>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2020-10-27 22:17</span>
                        <img src='http://api.map.baidu.com/images/weather/day/qing.png' alt='weather'/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
