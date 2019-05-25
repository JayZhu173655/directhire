// Boss信息完善页面
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector.jsx';
import {updateUser} from "../../redux/actions";

class NoobInfo extends Component {
    state = {
        header: '',
        post: '',
        info: ''
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    save = () => {
        this.props.updateUser(this.state);
    };

    // 需要子组件通过父组件传的函数改变父组件的状态
    setHeader = (header) => {
        this.setState({
            header: header
        })
    };
    render(){
        const {header, type} = this.props.user;
        if(header){
            // 如果用户信息完善则跳转到对应用户的界面
            const path = type === 'Boss' ? './boss' : '/noob';
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>Noob信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={val => {this.handleChange('post',val)}}>求职岗位：</InputItem>
                <TextareaItem
                    title='个人介绍：'
                    rows={3}
                    onChange={val => {this.handleChange('info',val)}}
                />
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), {
    updateUser
})(NoobInfo);