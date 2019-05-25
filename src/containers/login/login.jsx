import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; // 重定向到哪里
import Logo from '../../components/logo/logo'
import {login, changeErrorMsg} from '../../redux/actions';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile';
const ListItem = List.Item;


// 注册路由组件
class Login extends Component{

    state = {
        username: '',
        password: ''
    };

    login = () => {
        this.props.login(this.state)
    };

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    };

    // 跳转到注册路由
    toRegister = () => {
        this.props.changeErrorMsg('');
        this.props.history.replace('/register');
    };

    render(){
        const {msg, redirectTo} = this.props.user;
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>菜&nbsp;&nbsp;鸟&nbsp;&nbsp;直&nbsp;&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <List>
                        <ListItem>
                            <WhiteSpace />
                            <InputItem
                                onChange={val => {this.handleChange('username', val)}}
                                placeholder='请输入用户名'
                                onFocus={() => this.props.changeErrorMsg('')}
                            >用户名：</InputItem>
                            <WhiteSpace />
                            <InputItem
                                type='password'
                                onChange={val => {this.handleChange('password', val)}}
                                placeholder='请输入密码'
                                onFocus={() => this.props.changeErrorMsg('')}
                            >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                            <WhiteSpace />
                        </ListItem>
                        <ListItem>
                            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                            <WhiteSpace />
                            <Button onClick={this.toRegister}>注&nbsp;&nbsp;&nbsp;册</Button>
                        </ListItem>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user
}), {login, changeErrorMsg})(Login);