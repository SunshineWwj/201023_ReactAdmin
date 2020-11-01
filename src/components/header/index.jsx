/* eslint-disable react/prop-types */
/* eslint-disable no-script-url */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';
import {reqWeather} from '../../api/index';
import {Divider, Modal} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formatDateTime} from '../../utils/dateUtils';
import menuList from '../../config/menuConfig';

import {ExclamationCircleOutlined} from '@ant-design/icons';
import LinkButton from '../link-button';

class Header extends Component {
    state={
        data: {},
        user: {},
        currentTime: Date.now()
    }
    /**
     * 第一次render()之后执行一次
     * 一般在此执行异步操作，发ajax请求/启动定时器
     */
    componentDidMount() {
        reqWeather('上海').then(res => {
            console.log('res:', res);
            if(res)
                this.setState({
                    data: res
                });
        });
        this.interval = setInterval(() => this.setState({currentTime: Date.now()}), 1000);
    }
    
    //组件即将卸载之前
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname;
        let title = '';
        menuList.forEach(item => {
            if(item.key === path) //一层菜单找
                title = item.title;
            else if(item.children) { //一层没有，二层菜单找
                const cItem = item.children.find(cItem => cItem.key === path);
                if(cItem)
                    title = cItem.title;
            }
        });
        return title;
    }

    //退出登录
    loginOut = () => {
        Modal.confirm({
            title: '确认退出登录嘛？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.push('/login');
            }
        });
    }
    
    render() {
        const {dayPictureUrl, weather, temperature} = this.state.data;
        const {currentTime} = this.state;
        const {username} = memoryUtils.user;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.loginOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{formatDateTime(currentTime, 'YYYY-MM-DD  hh:mm:ss')}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}<Divider type="vertical"/>{temperature}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
