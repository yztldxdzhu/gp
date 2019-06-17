import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { isPhone, isCorrectPwd } from '../../utils/validate';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/login.css';

class LoginBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            userTel: '',
            userPwd: '',
            userType: 0,
            button: '登陆',
            checked: false,
        };
        this.accountBlur = this.accountBlur.bind(this);
        this.pwdBlur = this.pwdBlur.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentWillReceiveProps(newProps){
        let {actions, dispatch, state} = newProps;
        if(window.localStorage.getItem('loginInfo')){
            return;
        }else{
            let account = state.LoginReducers.account;
            let userType = state.LoginReducers.userType;

            let loginInfo = JSON.stringify({
                account,
                userType
            });
            if(loginInfo === '{}'){
                return;
            }
            window.localStorage.setItem('loginInfo', loginInfo);
        }
    }
    accountBlur(e){
        let tel = e.target.value;
        let {dispatch, actions} = this.props;
        dispatch(actions.isTelRegistered(tel));
    }
    pwdBlur(e){
        let pwd = e.target.value;
        if( !pwd ){
            // alert('密码不能为空');
        }else if( !isCorrectPwd(pwd) ){
            alert('密码格式错误！请输入正确格式的密码！只能输入6-20个字母、数字、下划线！');
        }
    }
    handleLogin(){
        this.setState({button: '登陆中...'});
        let { actions, dispatch } = this.props;
        /**  userType: 0代表普通用户, 1代表管理员, 2代表顾问  */
        let data = {};
        let account = data.userTel = this.state.userTel;
        let pwd = data.userPwd = this.state.userPwd;
        let userType = data.userType = this.state.userType;
        if( !account ){
            // alert( '账号不能为空！' );
            this.setState({button: '登陆'});
        }else if( !isPhone(account) ){
            alert( '格式错误！' );
            this.setState({button: '登陆'});
        }else if( !pwd ){
            // alert( '密码不能为空！' );
            this.setState({button: '登陆'});
        }else if( !isCorrectPwd(pwd) ){
            alert( '密码格式错误！只能输入6-20个字母、数字、下划线！' );
            this.setState({button: '登陆'});
        }else if( !userType ){
            alert('请选择用户类型！');
        }else if( userType == 1 ){
            this.context.router.push("/userManage");
        }else {
            dispatch(actions.requestLogin(account, userType, data, this));
        }
    }
    render(){
        let { state } = this.props;
        let userTypeDom;
        if(state.RegisterReducers.userType==0){
            userTypeDom = (
                <div ref="type"
                     className={styles.login_body_user_type}
                     onChange={ (e) => {this.setState({userType: e.target.value})} }>
                    <label htmlFor="user" className={styles.user_type}>
                        <input
                            id="user"
                            type="radio"
                            name="user_type"
                            value="0"
                            defaultChecked='defaultChecked'
                        />普通用户</label>
                    <label htmlFor="admin" className={styles.user_type}>
                        <input
                            id="admin"
                            type="radio"
                            name="user_type"
                            value="1"
                        />管理员</label>
                    <label htmlFor="expert" className={styles.user_type}>
                        <input
                            id="expert"
                            type="radio"
                            name="user_type"
                            value="2"
                        />顾问</label>
                </div>
            )
        }
        else if(state.RegisterReducers.userType==1){
            userTypeDom = (
                <div ref="type"
                     className={styles.login_body_user_type}
                     onChange={ (e) => {this.setState({userType: e.target.value})} }>
                    <label htmlFor="user" className={styles.user_type}>
                        <input
                            id="user"
                            type="radio"
                            name="user_type"
                            value="0"
                        />普通用户</label>
                    <label htmlFor="admin" className={styles.user_type}>
                        <input
                            id="admin"
                            type="radio"
                            name="user_type"
                            value="1"
                            defaultChecked='defaultChecked'
                        />管理员</label>
                    <label htmlFor="expert" className={styles.user_type}>
                        <input
                            id="expert"
                            type="radio"
                            name="user_type"
                            value="2"
                        />顾问</label>
                </div>
            )
        }
        else if(state.RegisterReducers.userType==2){
            userTypeDom = (
                <div ref="type"
                     className={styles.login_body_user_type}
                     onChange={ (e) => {this.setState({userType: e.target.value})} }>
                    <label htmlFor="user" className={styles.user_type}>
                        <input
                            id="user"
                            type="radio"
                            name="user_type"
                            value="0"
                        />普通用户</label>
                    <label htmlFor="admin" className={styles.user_type}>
                        <input
                            id="admin"
                            type="radio"
                            name="user_type"
                            value="1"
                        />管理员</label>
                    <label htmlFor="expert" className={styles.user_type}>
                        <input
                            id="expert"
                            type="radio"
                            name="user_type"
                            value="2"
                            defaultChecked='defaultChecked'
                        />顾问</label>
                </div>
            )
        }
        else if( !state.RegisterReducers.success ){
            userTypeDom = (
                <div ref="type"
                     className={styles.login_body_user_type}
                     onChange={ (e) => {this.setState({userType: e.target.value})} }>
                    <label htmlFor="user" className={styles.user_type}>
                        <input
                            id="user"
                            type="radio"
                            name="user_type"
                            value="0"
                            defaultChecked='defaultChecked'
                        />普通用户</label>
                    <label htmlFor="admin" className={styles.user_type}>
                        <input
                            id="admin"
                            type="radio"
                            name="user_type"
                            value="1"
                        />管理员</label>
                    <label htmlFor="expert" className={styles.user_type}>
                        <input
                            id="expert"
                            type="radio"
                            name="user_type"
                            value="2"
                        />顾问</label>
                </div>
            )
        }
        return (
            <div className={styles.login_body}>
                <span className={styles.login_body_hover}>手机验证码登陆</span>
                <h3 className={styles.login_body_title}>账号密码登陆</h3>
                <form className={styles.login_body_form}>
                    <div ref="type"
                         className={styles.login_body_user_type}
                         onChange={ (e) => {this.setState({userType: e.target.value})} }>
                        <label htmlFor="user" className={styles.user_type}>
                            <input
                                id="user"
                                type="radio"
                                name="user_type"
                                value="0"
                            />普通用户</label>
                        <label htmlFor="admin" className={styles.user_type}>
                            <input
                                id="admin"
                                type="radio"
                                name="user_type"
                                value="1"
                            />管理员</label>
                        <label htmlFor="expert" className={styles.user_type}>
                            <input
                                id="expert"
                                type="radio"
                                name="user_type"
                                value="2"
                            />顾问</label>
                    </div>

                    <input
                        value={this.state.userTel}
                        onChange={ (e) => { this.setState({ userTel: e.target.value }) } }
                        onBlur={this.accountBlur}
                        className={styles.login_body_text}
                        ref="account"
                        type="text"
                        autoComplete="nope"
                        placeholder="请输入您的帐号"/>

                    <input
                        onChange={ (e) => { this.setState({ userPwd: e.target.value }) } }
                        onBlur={this.pwdBlur}
                        className={styles.login_body_pwd}
                        ref="pwd"
                        type="password"
                        autoComplete="nope"
                        placeholder="请输入您的密码"/>

                    <input
                        onClick={this.handleLogin}
                        className={styles.login_body_btn}
                        type="button"
                        value={this.state.button}/>
                </form>

                <p className={styles.login_body_toother}>
                    <span className={styles.login_body_toregister}>
                        <NavLink to="/register">注册帐号</NavLink>
                    </span>
                    <span className={styles.login_body_tofindpwd}>
                        <NavLink to="/findpwd">忘记密码</NavLink>
                    </span>
                </p>
            </div>
        );
    }
}
LoginBody.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(LoginBody);