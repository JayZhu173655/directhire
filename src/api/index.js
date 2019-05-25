// 多个接口请求函数的模块 函数返回的是promise对象
// 暴露函数的写法有两种
// 第一种 export function 函数名（）{}
// 第二种 export const 函数名 = （） => {}

import ajax from './ajax';

// 解决跨域问题 1、jsonp 跨域方法 2、CORS 跨域 3、借助于服务器代码来跨域（正向代理、反向代理）

//注册接口
export const reqRegister = (user) => ajax('/register', 'POST',  user);

//登录接口
export const reqLogin = ({username, password}) => ajax('/login', 'POST', {username, password});

//更新用户数据
export const reqUpdateUser = (user) => ajax('/update', 'POST', user);

// 获取用户信息
export const reqUser = () => ajax('/user');

//获取用户列表
export const reqUserList = (type) => ajax('/userlist','GET', {type});

// 获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist');

// 修改数据为已读
export const reqReadMsg = (from, to) => ajax('/readmsg', 'POST',{from, to});



