// 这是Noob主界面的路由容器组件
import React , {Component} from 'react';
import {connect} from 'react-redux';
import UserList from '../../components/user-list/user-list.jsx';
import {getUserList} from  '../../redux/actions';

class Noob extends Component{
    componentDidMount(){
        // 去异步ajax请求获取用户列表
        this.props.getUserList('Boss');
    }
    render(){
        return <UserList userList={this.props.userList}/>
    }
}


export default connect(state => ({
    userList: state.userList
}),{
    getUserList
})(Noob);