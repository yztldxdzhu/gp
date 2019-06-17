import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import { isPhone, isCorrectPwd, isCorrectValiCode } from '../../utils/validate';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/register.css';

class RegisterUserBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            userTel: '',
            userPwd: '',
            sureUserPwd: '',
            valiCode: '',
            button: '注册',
            liked: true,
            count: 60
        };
        this.phoneBlur = this.phoneBlur.bind(this);
        this.setPwdBlur = this.setPwdBlur.bind(this);
        this.surePwdBlur = this.surePwdBlur.bind(this);
        this.validateClick = this.validateClick.bind(this);
        this.validateBlur = this.validateBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps(newProps){
        let {actions, dispatch, state} = newProps;
        if(window.localStorage.getItem('registerUserInfo')){
            return;
        }else{
            let account = state.RegisterReducers.account;
            let userType = state.RegisterReducers.userType;

            let registerUserInfo = JSON.stringify({
                account,
                userType
            });
            if(registerUserInfo === '{}'){
                return;
            }
            window.localStorage.setItem('registerUserInfo', registerUserInfo);
        }
    }
    phoneBlur(e){
        let tel = e.target.value;
        let {dispatch, actions} = this.props;
        dispatch(actions.isTelRegistered(tel));
    }
    setPwdBlur(e){
        let pwd = e.target.value;
        if( !pwd ){
            // alert('密码不能为空');
        }else if( !isCorrectPwd(pwd) ){
            alert('密码格式错误！请输入正确格式的密码！只能输入6-20个字母、数字、下划线！');
        }
    }
    surePwdBlur(e){
        let pwdSet = this.refs.setPwd.value;
        let pwdSure = e.target.value;
        if( !pwdSure ){
            // alert('密码不能为空');
        }else if( !isCorrectPwd(pwdSure) ){
            alert('密码格式错误！请输入正确格式的密码！只能输入6-20个字母、数字、下划线！');
        }else if( pwdSet !== pwdSure ){
            alert('两次密码输入不一致！');
        }
    }
    validateClick(){
        if(this.state.liked){
            this.timer = setInterval(function () {
                let count = this.state.count;
                this.state.liked = false;
                count -= 1;
                if(count < 1){
                    this.setState({
                        liked: true
                    });
                    count = 60;
                }
                this.setState({
                    count: count
                })
            }.bind(this),1000);
        }
        let url = `http://localhost:8080/gp/user/sendCode`;
        let phoneNumber = this.refs.phone.value;
        $.ajax({
            url: url,
            type: 'POST',
            xhrFields: {
                withCredentials: true,
            },
            data: {
                phoneNumber: phoneNumber
            },
            success: function (res) {
                console.log(typeof res, res);
                if(res.isOk === true){
                    clearInterval(this.timer);
                    alert( res.msg );//'短信验证码发送成功！请注意查收短信！'
                }else{
                    alert('短信验证码发送失败！')
                }
            },
            error: function (err) {
                console.log('err: ', err);
            }
        })
    }
    validateBlur(e){
        let valiCode = e.target.value;
        if( !valiCode ){
            // alert('验证码不能为空');
        }else if( !isCorrectValiCode(valiCode) ){
            alert('验证码格式错误！');
        }else{
            let url = `http://localhost:8080/gp/user/validateCode`;
            let phoneNumber = this.refs.phone.value;
            $.ajax({
                url: url,
                type: 'POST',
                xhrFields: {
                    withCredentials: true,
                },
                data: {
                    phoneNumber: phoneNumber,
                    testCode: valiCode
                },
                success: function (res) {
                    console.log(typeof res, res);

                },
                error: function (err) {
                    console.error('err: ', err);
                }
            })
        }
    }
    handleClick(){
        this.setState({button: '注册中...'});
        let { actions, dispatch, state } = this.props;
        let userType = 0;//普通用户
        let data = {};
        let userTel = data.userTel = this.state.userTel;
        let userPwd = data.userPwd = this.state.userPwd;
        if( !userTel ){
            // alert( '账号不能为空！' );
            this.setState({button: '注册'});
        }else if( !isPhone(userTel) ){
            alert( '手机号格式错误！' );
            this.setState({button: '注册'});
        }else if( !userPwd ){
            // alert( '密码不能为空！' );
            this.setState({button: '注册'});
        }else if( !isCorrectPwd(userPwd) ){
            alert( '密码格式错误！只能输入6-20个字母、数字、下划线！' );
            this.setState({button: '注册'});
        }else{
            dispatch(actions.requestReginster(userType, data, this));
        }
    }
    render(){
        return (
            <div className={styles.register_body}>
                <span className={styles.register_body_hover}>邮箱注册</span>
                <h3 className={styles.register_body_title}>手机号注册</h3>
                <form className={styles.register_body_form}>

                    <label className={styles.register_body_label} htmlFor="phone">手机号码</label>
                    <input
                        value={this.state.userTel}
                        onChange={ (e) => {this.setState({userTel: e.target.value})} }
                        onBlur={this.phoneBlur}
                        ref="phone"
                        className={styles.register_body_text}
                        id="phone"
                        type="text"
                        placeholder="请输入您的手机号"/>

                    <label className={styles.register_body_label} htmlFor="set_pwd">设置密码</label>
                    <input
                        value={this.state.userPwd}
                        onChange={ (e) => {this.setState({userPwd: e.target.value})} }
                        onBlur={this.setPwdBlur}
                        ref="setPwd"
                        className={styles.register_body_pwd}
                        id="set_pwd"
                        type="password"
                        placeholder="请输入您的密码"/>

                    <label className={styles.register_body_label} htmlFor="sure_pwd">确认密码</label>
                    <input
                        value={this.state.sureUserPwd}
                        onChange={ (e) => {this.setState({sureUserPwd: e.target.value})} }
                        onBlur={this.surePwdBlur}
                        ref="surePwd"
                        className={styles.register_body_pwd}
                        id="sure_pwd"
                        type="password"
                        placeholder="请再次输入您的密码"/>

                    <label className={styles.register_body_label} htmlFor="validate">短信验证码</label>
                    <input
                        value={this.state.valiCode}
                        onChange={ (e) => {this.setState({valiCode: e.target.value})} }
                        onBlur={this.validateBlur}
                        ref="valiCode"
                        className={styles.register_body_validate}
                        id="validate"
                        type="text"
                        placeholder="请输入短信验证码"/>
                    <span className={styles.register_body_getvali} onClick={this.validateClick}>
                        {this.state.liked ? '免费获取' : this.state.count + 's后重发'}
                    </span>

                    <input
                        onClick={this.handleClick}
                        className={styles.register_body_btn}
                        type="button"
                        value={this.state.button}/>
                </form>

                <p className={styles.register_body_toother}>
                    <NavLink to="/login">已有账号？立即登录</NavLink>
                    <NavLink to="/expertReg">顾问注册</NavLink>
                </p>
            </div>
        );
    }
}
RegisterUserBody.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(RegisterUserBody)