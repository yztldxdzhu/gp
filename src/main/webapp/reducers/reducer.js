/*
*  reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。
*  根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，
*  state树中有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义。

const reducer = combineReducers({
    a: doSomethingWithA,
    b: processB,
    c: c
})
 *  */

import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import RegisterReducers from './RegisterReducers';
import SearchReducers from './SearchReducers';
const InitReducers = combineReducers({
    LoginReducers,
    RegisterReducers,
    SearchReducers
});
export default InitReducers;


/*
import merged from 'obj-merged';
const DB = (_ID = '', setting = {}) => {
    const cb = {
        setDefault: () => {
            var defaults = merged({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y
                mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
            }, setting);

            return {
                defaults,
                path: {}
            }
        },

        setState: (state, target) => {
            state.path[target.path] = target;
            return merged(state);
        }
    };

    return (state = {}, action = {}) => {
        if(action._ID && action._ID !== _ID){
            return state;
        }else if(cb[action.type]){
            return cb[action.type](state, action.target);
        }else{
            return cb.setDefault();
        }
    }
};
const UserReducer = (state = JSON.parse(localStorage.getItem('User')), action) => {

    // 整个应用的初始状态，可以作为 State 的默认值。

    switch (action.type){
        case 'sign_in_success'://登陆成功
            localStorage.setItem('User', JSON.stringify(action.target));
            return action.target;
        case 'sign_out'://退出登陆
            localStorage.removeItem('User');
            return null;
        default:
            return state;
    }
};
const SearchReducer = (state = JSON.parse(localStorage.getItem('Search')), action) => {

    // 整个应用的初始状态，可以作为 State 的默认值。

    switch (action.type){
        case 'sign_in_success'://登陆成功
            localStorage.setItem('Search', JSON.stringify(action.target));
            return action.target;
        case 'sign_out'://退出登陆
            localStorage.removeItem('Search');
            return null;
        default:
            return state;
    }
};
export default { UserReducer, SearchReducer };*/