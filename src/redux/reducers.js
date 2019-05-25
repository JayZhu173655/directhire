/*
*   包含所有reducer函数，根据action的Type来改变state（即根据旧的state和新的action下挂在的数据，返回一个新的state）
*/
import {combineReducers} from 'redux';
import {getRedirectTo} from '../utils';
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-type';

// 初始state,用户名/用户类型/错误信息/重定向到哪里去
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo:''
};

//产生user状态的reducer
function user(state=initUser, action){
    switch(action.type){
        case AUTH_SUCCESS :
            const {header, type} = action.data;
            return {...action.data, redirectTo: getRedirectTo(type, header)};
        case ERROR_MSG :
            return {...state, msg: action.data};
        case RECEIVE_USER :
            return action.data;
        case RESET_USER :
            return {...initUser, msg: action.data};
        default:
            return state
    }
}

const initUserList = [];
//产生userList状态的reducer
function userList(state=initUserList, action){
    switch(action.type){
        case RECEIVE_USER_LIST :
            return action.data;
        default:
            return state
    }
}

const initChat = {
    users: {}, //所有用户信息的对象 属性名：userid,属性值是：{username，header}
    chatMsgs: [], // 当前用户所有相关的msg的数组
    unReadCount: 0 // 总得未读数
};

// 产生聊天状态的reducer
function chat(state = initChat, action){
    switch(action.type){
        case RECEIVE_MSG_LIST :
            const {users, chatMsgs, userid} = action.data;
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (msg.read && msg.to === userid ? 1 : 0), 0)
            };
        case RECEIVE_MSG :
            const {chatMsg} = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            };
        case MSG_READ :
            const {from, to, count} = action.data;
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from === from && msg.to === to && msg.read){
                        // read值需要改变
                        return {...msg, read: false}
                    } else{
                        // read值不需要改变
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            };
        default :
            return state;
    }
}

//向外暴露的是一个对象
export default combineReducers({
    user,
    userList,
    chat
});

