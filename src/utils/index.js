// 所有工具函数的模块

//一个可以返回路由路径的函数
export function getRedirectTo(type, header){
    let path;

    // 判断是什么类型
    if(type === 'Boss'){
        path = '/boss';
    } else{
        path = '/noob'
    }

    // 判断信息是否存在
    if(!header){
        path += 'info';
    }
    return path;
}

/*
*   用户主界面路由
*       noob: /noob
*       boss: /boss
*   用户信息完善页面路由
*       noob: /noobinfo
*       boss: /bossinfo
*   判断用户信息是否完善？user.header是否为空
*   判断用户类型： user.type
*
*/