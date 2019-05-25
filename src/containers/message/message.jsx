// 这是消息列表主界面的路由容器组件
import React , {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;
const Brief = Item.Brief;

// 对chatMsgs按chat_id分组,获取到每个组的lastMsg组成的数组
/*
*   1)、找出每个聊天的lastMsg,并用一个对象容器来保存{chat_id: lastMsg}
*   2）、得到所有lastMsg的数组
*   3）、对数组进行排序（按信息创建的时间，降序排序）
*/
function getLastMsgs(chatMsgs, userid){
    // 找出所有对话的lastMsg
    const lastMsgObjs = {};

    chatMsgs.forEach(msg => {
        // 对未读消息个体统计
        if(msg.to === userid && msg.read){
            msg.unReadCount = 1
        } else{
            msg.unReadCount = 0
        }

        // 获得聊天信息的标示id
        const chatId = msg.chat_id;
        //获取已保存的当前组件的lastMsg
        let lastMsg = lastMsgObjs[chatId];

        //如何对象容器lastMsgObjs中没有lastMsg
        if(!lastMsg){
            // 对象容器内没有，就保存到里面
            lastMsgObjs[chatId] = msg
        } else{
            // 获取已读数量数量 总的unReadCount = 已经统计的 + 当前msg的unReadCount
            let unReadCount = lastMsg.unReadCount + msg.unReadCount;

            //如果有，则比较当前是不是晚的，是的话就更新，不是就不做任何事情
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
             // 累加unReadCount并保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount ;
        }
    });
    //把容器对象转换成数组 并排序
    const lastMasgs = Object.values(lastMsgObjs);
    lastMasgs.sort(function(m1, m2){
        // 如果返回结果小于0，就把m1放前面 ；结果等于0，就不变 ；结果大于0，就把m2放前面
        return m2.create_time - m1.create_time
    });

    return lastMasgs

}

// ctrl + n可查找文件并打开
class Message extends Component{
    render(){
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;
        // 对chatMsgs按chat_id分组
        const lastMsgs =  getLastMsgs(chatMsgs, user._id);

        return (
            <List className='chat-msg-list'>
                <QueueAnim type='scaleBig' delay={100}>
                    {
                        lastMsgs.map(msg => {
                            // 获取目标用户的id和信息
                            const targetUserId = msg.to === user._id ? msg.from : msg.to;
                            const targetUser = users[targetUserId];
                            return (
                                <Item
                                    key={msg._id}
                                    extra={<Badge text={msg.unReadCount}/>}
                                    thumb={ targetUser.header ? require(`../../assets/images/${targetUser.header.substring(2)}.jpg`) : null}
                                    arrow='horizontal'
                                    onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                                >
                                    {msg.content}
                                    <Brief>{targetUser.username}</Brief>
                                </Item>
                            )
                        })
                    }
                </QueueAnim>
            </List>
        )
    }
}


export default connect(state => ({
    user: state.user,
    chat: state.chat
}),{

})(Message);