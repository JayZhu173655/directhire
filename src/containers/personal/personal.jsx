// 这是个人中心主界面的路由容器组件
import React , {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import {resetUser} from '../../redux/actions';

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component{

    logout = () => {
        Modal.alert('退出登录', '确定要退出账户么？',[
            {
                text: '取消'
            },
            {
                text: '确定',
                onPress: () => {
                    // 退出要清除cookies里的userid
                    Cookies.remove('userid');
                    // 还要重置redux里面的数据
                    this.props.resetUser()
                }
            }
        ])
    };

    render(){
        const {username, header, company, post, salary,info} = this.props.user;

        return (
            <div className='personal-title'>
                <Result
                    img={<img src={require(`../../assets/images/${header.substring(2)}.jpg`)} style={{width: 50}} alt={header}/>}
                    title={username}
                    message={company ? company : null}
                />
                <List renderHeader={ () => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {
                            salary ? <Brief>薪资：18k</Brief> : null
                        }
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logout}>退出账户</Button>
                </List>
            </div>
        )
    }
}


export default connect(state => ({
    user: state.user
}),{
    resetUser
})(Personal);