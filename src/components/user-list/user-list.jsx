// 显示指定用户列表的UI组件
import React , {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    };
    render(){
        const {userList} = this.props;
        return (
            <WingBlank className='user-list-content'>
                <QueueAnim type='scaleX' delay={100}>
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace />
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={require(`../../assets/images/${user.header.substring(2)}.jpg`)}
                                        extra= {user.username}
                                    />
                                    <Body>
                                    <div>职位： {user.post}</div>
                                    { user.type === 'Boss' ? <Fragment><div>公司： ${user.company}</div><div>薪资： ${user.salary}</div></Fragment> : null}
                                    <div>描述： {user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}


export default withRouter(UserList);