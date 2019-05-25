// boss 或者 noob头像选择界面组件

import React, {Component} from 'react';
//import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {List, Grid} from 'antd-mobile';

class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    };
    state = {
        icon: null,
        text: null
    };
    constructor(props){
        super(props);
        this.headerList = [];
        for(let i = 0; i < 20; i++){
            this.headerList.push({
                text: '头像' + (i + 1),
                icon: require('../../assets/images/'+ (i + 1) + '.jpg')
            })
        }
    }

    handleClick = ({text, icon}) => {
        // 宫格点击需要更新当前组件的状态和父组件的状态
        this.setState({text, icon});
        this.props.setHeader(text);
    };

    render(){
        const {icon, text} = this.state;
        const listHeader = !icon ? '请选择头像' : (
            <div>
                已选择头像：<img src={icon} alt={text}/>
            </div>
        );
        return (
            <List renderHeader={() => listHeader}>
                <Grid
                    data={this.headerList}
                    columnNum={5}
                    onClick ={this.handleClick}
                />
            </List>
        )
    }
}

export default HeaderSelector;