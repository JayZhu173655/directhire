import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; // 重定向到哪里
import Logo from '../../components/logo/logo'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile';
import {register, changeErrorMsg} from '../../redux/actions';
const ListItem = List.Item;


// 注册路由组件
class Register extends Component{

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'Boss'
    };

    // 点击注册按钮 去注册用户
    register = () => {
       this.props.register(this.state)
    };

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    };

    toLogin = () => {
        this.props.changeErrorMsg('');
        this.props.history.replace('/login');
    };

    render(){
        const {type} = this.state;
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
                            <InputItem
                                type='password'
                                onChange={val => {this.handleChange('password2', val)}}
                                placeholder='请再次输入密码'
                                onFocus={() => this.props.changeErrorMsg('')}
                            >确认密码：</InputItem>
                            <WhiteSpace />
                        </ListItem>
                        <ListItem>
                            <span>用户类型</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === '菜鸟'} onChange={() => this.handleChange('type', '菜鸟')}>菜鸟</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'Boss'} onChange={() => this.handleChange('type', 'Boss')}>Boss</Radio>
                        </ListItem>
                        <ListItem>
                            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                            <WhiteSpace />
                            <Button onClick={this.toLogin}>已有账户</Button>
                        </ListItem>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
// const mapState = (state) => ({
//
// });
// 这里都是异步的action必须用dispatch
// const mapDispatch = (dispatch) => {
//     return ({
//         register
//     })
// };
export default connect(state => ({
    user: state.user
}), {register, changeErrorMsg})(Register);