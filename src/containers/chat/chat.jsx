// 这是对话列表主界面的路由容器组件
import React , {Component} from 'react';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/actions';

const Item = List.Item;


class Chat extends Component{
    emojis = ['😀' ,'😃' ,'😄' ,'😁' ,'😆' ,'😅' ,'🤣' ,'😂' ,'🙂' ,'🙃' ,'😉' ,'😊 ','😇' ,'🥰' ,'😍','🤩' ,'😘' ,'😗' ,'☺' ,'😚' ,'😙' ,'😋' ,'😛' ,'😜' ,'🤪' ,'😝' ,'🤑' ,'🤗' ,'🤭' ,'🤫' ,'🤔' ,'🤐 ','🤨','😐 ','😑 ','😶 ','😏','😒 ','🙄 ','😬 ','🤥' ,'😌','😔' ,'😪' ,'🤤' ,'😴' ,'😷' ,'🤒' ,'🤕' ,'🤢' ,'🤮','🤧' ,'🥵' ,'🥶','🥴' ,'😵' ,'🤯' ,'🤠' ,'🥳','😎 ','🤓' ,'🧐' ,'😕' ,'😟' ,'🙁' ,'☹' ,'😮 ','😯 ','😲' ,'😳 ','🥺','😦' ,'😧' ,'😨' ,'😰' ,'😥 ','😢 ','😭 ','😱 ','😖 ','😣 ','😞' ,'😓 ','😩','😫' ,'😤' ,'😡 ','😠' ,'🤬' ,'😈 ','👿' ,'💀','☠'];

    state = {
        content: '',
        isShow: false
    };

    handleSend = () => {
        //收集数据
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        // 发送请求
        if(content){
            this.props.sendMsg({from, to, content});
        }
        // 清空输入框 设置表情包的显示值
        this.setState({
            content: '',
            isShow: false
        });
    };

    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        //解决Grid开始显示不完全的bug
        if(isShow){
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    };

    componentWillMount(){
        //组件即将加载前初始化表情列表数据
        const emojis = ['😀' ,'😃' ,'😄' ,'😁' ,'😆' ,'😅' ,'🤣' ,'😂' ,'🙂' ,'🙃' ,'😉' ,'😊 ','😇' ,'🥰' ,'😍','🤩' ,'😘' ,'😗' ,'☺' ,'😚' ,'😙' ,'😋' ,'😛' ,'😜' ,'🤪' ,'😝' ,'🤑' ,'🤗' ,'🤭' ,'🤫' ,'🤔' ,'🤐 ','🤨','😐 ','😑 ','😶 ','😏','😒 ','🙄 ','😬 ','🤥' ,'😌','😔' ,'😪' ,'🤤' ,'😴' ,'😷' ,'🤒' ,'🤕' ,'🤢' ,'🤮','🤧' ,'🥵' ,'🥶','🥴' ,'😵' ,'🤯' ,'🤠' ,'🥳','😎 ','🤓' ,'🧐' ,'😕' ,'😟' ,'🙁' ,'☹' ,'😮 ','😯 ','😲' ,'😳 ','🥺','😦' ,'😧' ,'😨' ,'😰' ,'😥 ','😢 ','😭 ','😱 ','😖 ','😣 ','😞' ,'😓 ','😩','😫' ,'😤' ,'😡 ','😠' ,'🤬' ,'😈 ','👿' ,'💀','☠'];
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    // 让对话列表显示最底部信息（即让滚动条滑动到最下面）
    componentDidMount(){
        window.scrollTo(0, document.body.scrollHeight);

    }
    componentDidUpdate(){
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentWillUnmount() {
        if(this.props.chat.unReadCount){
            // 去改变消息未读的数量
            const from = this.props.match.params.userid;
            const to = this.props.user._id;
            //发请求更新未读数量
            this.props.readMsg(from, to)
        }
    }

    render(){
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;
        // 对chatMsg过滤
        const meId = user._id;
        if(!users[meId]){
            //如果还没有获取数据。就不做任何显示
            return null;
        }
        const targetId = this.props.match.params.userid;
        const chatId = [meId, targetId].sort().join('_');
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

        // 获取聊天对方的头像
        const targetHeader = users[targetId].header.substring(2);
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.jpg`) : null;
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    onLeftClick={ () => this.props.history.goBack()}
                >{users[targetId].username}</NavBar>
                <List className='chat-msg-list'>
                    <QueueAnim type='scaleY' delay={100}>
                        {
                            msgs.map(msg => {
                                if(targetId === msg.from){
                                    //对方发给自己的消息
                                    return (
                                        <Item
                                            thumb={targetIcon}
                                            key={msg._id}
                                        > {msg.content} </Item>
                                    )
                                } else{
                                    return (
                                        <Item
                                            className='chat-me'
                                            extra='我'
                                            key={msg._id}
                                        > {msg.content} </Item>
                                    )
                                }
                            })
                        }
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} role="img" aria-label='emojis'>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                //93
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />
                        ) : null
                    }

                </div>
            </div>

        )
    }
}


export default connect(state => ({
    user: state.user,
    chat: state.chat
}),{
    sendMsg,
    readMsg
})(Chat);