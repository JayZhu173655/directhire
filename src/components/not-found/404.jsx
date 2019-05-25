// 这是Boss主界面的路由容器组件
import React , {Component} from 'react';
import {Button, Card, WingBlank, WhiteSpace} from 'antd-mobile';

const {Header, Body} = Card;

class Lost extends Component{
    constructor(props){
        super(props);
        this.goToHome = this.goToHome.bind(this);
    }
    goToHome(){
        this.props.history.replace('/');
        console.log(this)
    }
    render(){
        return (
            <WingBlank size='lg' className='lost-page-marginTop'>
                <WhiteSpace size='lg'/>
                <Card>
                    <Header
                        title='页面走丢了……'
                    />
                    <Body>
                        <p>作者因为懒惰把您要寻找的页面当卫生纸了，为了表达歉意5秒后自动跳转到主页</p>
                        <Button
                            type='primary'
                            onClick={this.goToHome}
                        >回到主页</Button>
                    </Body>
                </Card>
            </WingBlank>
        )
    }

    componentDidMount(){
        setTimeout(this.goToHome, 5000)
    }
}


export default Lost;