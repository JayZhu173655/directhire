// 这是Boss主界面的路由容器组件
import React , {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
//可以包装非路由组件，使组件具有location、history、math等属性
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;

class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    };
    render(){
        let {navList, unReadCount} = this.props;

        // 过滤掉不需要渲染的数据
        navList = navList.filter(nav => !nav.hide);

        // 希望在非路由组件中使用路由库的api
        //可以使用路由组件库提供的函数withRouter()
        const path = this.props.location.pathname;
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item
                            key={nav.path}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            title={nav.text}
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

// 向外暴露withRouter（）包装产生的组件，内部会想组件中传入一些路由组件特有属性：history/location/math
export default withRouter(NavFooter);