/**
 * 左侧导航组件
 */
import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'

import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;


 class LeftNav extends Component {
/**
 * 根据menu的数据生成对应的标签数组
 * 使用map()+递归调用
 */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={<HomeOutlined />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item> 
                )
            }else{
                return (
                    <SubMenu key={item.key} icon={<AppstoreOutlined/>} title={item.title}>
                        {
                            this.getMenuNodes(item.children)//递归调用
                        }
                    </SubMenu> 
                )
            }
        })
    }
/**
 * 根据menu的数据生成对应的标签数组
 * 使用reduce((pre,curr)=>{return xxx},默认值)+递归调用
 */
    getMenuNodes = (menuList) =>{
        const path=this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            //向pre中添加<Menu.Item>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={<HomeOutlined />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item> 
                ))
            }else{
                //查找与当前求情路径匹配的子item
                const cItem=item.children.find(cItem=>cItem.key===path)
                //如果存在，说明当前item的子列表需要展开
                if(cItem) this.openKey=item.key

            //或者向pre中添加<SubMenu>
                pre.push((
                    <SubMenu key={item.key} icon={<AppstoreOutlined/>} title={item.title}>
                        {
                            this.getMenuNodes(item.children)//递归调用
                        }
                    </SubMenu> 
                ))
            }
            return pre;
        },[]);
    }
    
    /**
     * 在第一次render()之前执行一次
     * 为第一个render()准备数据（必须同步的）
     */
    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList)
    }

    render() {
        // debugger
        //得到当前请求的路由路径,来实现选中当前菜单项
        const path=this.props.location.pathname;
        
        //得到需要打开菜单项的key
        const openKey=this.openKey

        return (
            <div  className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo'/>
                    <h1>react后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
/**
 * withRouter高阶组件：
 *    >包装非路由组件，返回一个新的组件
 *    >新组件  向非路由组件  传递3个属性：history/location/math 
 */
export default withRouter(LeftNav)