import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile';
// 操作前端的cookie的js库
import Cookies from 'js-cookie';
import {getRedirectTo} from "../../utils";
import BossInfo from '../boss-info/boss-info.jsx';
import NoobInfo from '../noob-info/noob-info.jsx';
import Boss from '../boss/boss.jsx';
import Noob from '../noob/noob.jsx';
import Message from '../message/message.jsx';
import Personal from '../personal/personal.jsx';
import Lost from '../../components/not-found/404.jsx';
import NavFooter from '../../components/nav-footer/nav-footer.jsx';
import Chat from '../../containers/chat/chat.jsx';
import {getUser} from '../../redux/actions';
/*
*    Main控制子路由
*    1、实现自动跳转
*       1、如果cookies中有userid，发送请求获取对应的user，暂时在请求中不做任何显示
*       2、如果cookies中没有userid，则跳转到login界面
*    2、如果已经登录，根据user数据计算路径，然后跳转不同的路由
*       根据user的type和header来计算一个重定向的路径，并跳转
*/
// 登录路由组件
class Main extends Component{
    // 给组件对象添加属性
    // 包含所有导航组件的相关信息数据
    navList = [
        { path: '/boss',  component: Boss, title: 'Noob列表', icon: 'noob', text: 'Noob'},
        { path: '/noob', component: Noob, title: 'Boss列表', icon: 'boss', text: 'Boss'},
        { path: '/message', component: Message, title: '消息列表', icon: 'message', text: '消息'},
        { path: '/personal', component: Personal, title: '用户中心', icon: 'personal', text: '个人'}
    ];
    componentDidMount(){
        //登录过（cookies中有userid），如果没登录（redux管理的user中没有_id),发送请求获取对应的User
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if(userid && !_id){
            // 发送异步请求，获取user
            this.props.getUser()
        }
    }
    render(){
        // debugger
        // 读取cookie中的userid
        const userid = Cookies.get('userid');
        // 如果没有userid，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login'/>
        }
        // 如果有userid，读取redux中的user状态
        const {user, unReadCount} = this.props;
        // 如果redux中的user状态没有_id，返回null(什么都不干)

        if(!user._id){
            return null
        } else{
            // 如果redux中的user状态有_id，显示对应的用户界面
            // 如果请求根路径，根据user的type和header来确定一个重定向的路径，并自动重定向
            let path = this.props.location.pathname;
            if(path === '/'){
                //计算得到一个重定向的路由
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path}/>
            }
        }

        const {navList} = this;
        // 获取当前请求的路径(路由组件才会有下面属性)
        const path = this.props.location.pathname;
        // 获取当前路径对应的nav (也可能有，也可能没有)
        const currentNav = navList.find(nav => nav.path === path);

        if(currentNav){
            //决定隐藏noob还是隐藏boss导航按钮
            if(user.type === 'Boss'){
                // 当用户类型是Boss则隐藏boss导航按钮
                navList[1].hide = true
            } else{
                // 当用户类型是Noob则隐藏noob导航按钮
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>)
                    }
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/noobinfo' component={NoobInfo}/>
                    <Route path='/chat/:userid' component={Chat} />
                    <Route component={Lost}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user,
    unReadCount: state.chat.unReadCount
}), {
    getUser
})(Main);