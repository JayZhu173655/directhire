import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Register from './containers/register/register.jsx';
import Login from './containers/login/login.jsx';
import Main from './containers/main/main.jsx';
import store from './redux/store';
import './assets/css/index.less';
//import './test/socketio_test'


ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    {/*上面的路由匹配不到都会到下面的路由去找*/}
                    <Route component={Main} />
                </Switch>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('root')
);