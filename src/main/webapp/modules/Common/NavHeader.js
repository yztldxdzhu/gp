import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import Logout from '../LoginAndRegisterPages/Logout';
import NavLink from './NavLink';
import styles from '../../public/styles/user/common.css';

class NavHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingCartList: [],
        };
    }
    componentDidMount(){
        let { actions, dispatch } = this.props;
        dispatch(actions.getUserCar(this));
    }
    render(){
        let { actions, dispatch, state } = this.props;

        let welcome = state.LoginReducers.success ?
            (<li> <Logout actions={actions} /> 欢迎您！{state.LoginReducers.account}</li>) :
            (<li>您好，请<NavLink to="/login">登陆</NavLink></li>);

        let message = state.LoginReducers.success ?
            (<li><NavLink to="/personalCenter/myMessage">站内信</NavLink><span>5</span></li>) :
            (<li onClick={ () => {alert('请登录后再进行操作！')} } style={{cursor: 'pointer'}}>站内信</li>);

        let myBroad = state.LoginReducers.success ?
            (<li><NavLink to="/personalCenter/myApply">我的留学</NavLink></li>) :
            (<li onClick={ () => {alert('请登录后再进行操作！')} } style={{cursor: 'pointer'}}>我的留学</li>);

        let car = state.LoginReducers.success ?
            (<li><NavLink to="/personalCenter/myCar">购物车</NavLink><span>{this.state.shoppingCartList.length}</span></li>) :
            ((<li onClick={ () => {alert('请登录后再进行操作！')} } style={{cursor: 'pointer'}}>购物车</li>));

        return (
            <nav className={styles.nav_header}>
                <ul>
                    {welcome}
                    <li><NavLink to="/register">免费注册</NavLink></li>
                    {message}
                    <li>手机下载</li>
                    {myBroad}
                    {car}
                    <li>网站导航</li>
                </ul>
            </nav>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state };
};
export default connect(mapStateToProps)(NavHeader);