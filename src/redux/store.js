/*
*   redux核心管理数据的对象模块（可以称之为所有state的数据仓库）
*/
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;