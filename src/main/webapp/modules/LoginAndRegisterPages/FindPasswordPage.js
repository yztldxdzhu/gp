import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { isPhone, isCorrectPwd, isCorrectValiCode } from '../../utils/validate';
import NavLink from '../Common/NavLink';
import logoBg from '../../public/images/logobg.png';
import logo from '../../public/images/azlx1.jpg';
import styles from '../../public/styles/user/findpwd.css';
class FindPwdComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            domWidth: '',
            domHeight: ''
        }
    };

    componentWillMount(){
        const domWidth = document.body.clientWidth || document.documentElement.clientWidth;
        const domHeight = document.body.clientHeight || document.documentElement.clientHeight;
        this.setState({
            domWidth: domWidth,
            domHeight: domHeight
        });
    };

    render(){
        return (
            <div style={{
                width: this.state.domWidth,
                height: this.state.domHeight,
                background: 'url(' + logoBg + ')',
                backgroundSize: '100% 100%'
            }}>
                <FindPwdHeader />
                <FindPwdBody />
            </div>
        )
    }
}

class FindPwdHeader extends Component{
    render(){
        return (
            <div className={styles.findpwd_header}>
                <NavLink to="/">
                    <img
                        className={styles.findpwd_header_img}
                        src={logo}
                        alt="澳洲留学"
                        width='70px'
                        height='46px' />
                </NavLink>
                <span className={styles.findpwd_header_title}>
                    <NavLink to="/">澳洲留学 </NavLink>
                    |
                    <NavLink to="/findpwd"> 找回密码</NavLink>
                </span>
                <span className={styles.findpwd_header_toregister}>
                    <NavLink to="/register">免费注册</NavLink>
                </span>
                <span className={styles.findpwd_header_tologin}>
                    <NavLink to="login">登陆</NavLink>
                </span>
            </div>
        );
    }
}

class FindPwdBody extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: true,
            count: 60
        };
        this.phoneBlur = this.phoneBlur.bind(this);
        this.validateClick = this.validateClick.bind(this);
        this.validateBlur = this.validateBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /*验证手机号是否被注册过，both普通用户和顾问，这里的接口只针对普通用户========要改*/
    phoneBlur(e) {
        let phone = e.target.value;//受控组件，不使用refs
        if (!phone) {
            // alert('手机号不能为空！');
        } else if (!isPhone(phone)) {
            alert('手机号格式错误！请输入正确格式的手机号！');
        } else {
            let url = `http://localhost:8080/gp/user/userTelCheck`;
            $.ajax({
                url: url,
                type: 'POST',
                xhrFields: {
                    withCredentials: true,
                },
                data: {
                    userTel: phone
                },
                success: function (res) {
                    console.log(typeof res, res);
                    if (res.success === false) {
                        alert('该手机号已经被注册过！您可以继续找回密码！' + res.msg);
                    } else if (res.success === true) {
                        alert('该手机号尚未被注册！不可以找回密码，请您前去注册！' + res.msg);
                        this.context.router.push('/register');//跳转到注册页面
                    }
                }.bind(this),
                error: function (err) {
                    console.error('err: ', err);
                }
            });
        }
    }

    /*点击获取验证码====================出错，可能验证码没有了，并没有发送到手机上*/
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
        });
    }

    /*验证用户输入的验证码是否与服务器一致。==============没有验证，未获取到验证码*/
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

    /*用户点击下一步时，发送AJAX，将手机号和验证码发送给后台。后台发送正确的密码，放在res里面
    * 跳到登录页面================没有验证码，接口未测试*/
    handleClick(){
        let userType = 3;
        /*userType: 1表示普通用户，2表示顾问*/

        let phoneNumber = this.refs.phone.value;
        let testCode = this.refs.testCode.value;
        console.log(phoneNumber, testCode);

        if(userType === 1){
            let url = `http://localhost:8080/gp/user/pwdBack`;
            $.ajax({
                url: url,
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    phoneNumber: phoneNumber,
                    testCode: testCode
                },
                success: (res) => {
                    console.log('普通用户找回密码，res',res);
                    if(res.isOk === true){
                        alert('您的密码已找回，密码是： ', res.pwd);
                        this.context.router.push('/login');//找回密码后，跳转到登录页面
                    }else{
                        alert('找回密码有误，请重新操作！');
                    }
                },
                error: (err) => {
                    console.error('err: ',err);
                }
            })
        }else if(userType === 2){
            let url = `http://localhost:8080/gp/expert/pwdBack`;
            $.ajax({
                url: url,
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    phoneNumber: phoneNumber,
                    testCode: testCode
                },
                success: (res) => {
                    console.log('顾问找回密码，res',res);
                    if(res.isOk === true){
                        alert('您的密码已找回，密码是： ', res.pwd);
                        this.context.router.push('/login');//找回密码后，跳转到登录页面
                    }else{
                        alert('找回密码有误，请重新操作！');
                    }
                },
                error: (err) => {
                    console.error('err: ',err);
                }
            })
        }
    }

    render(){
        return (
            <div className={styles.findpwd_body}>
                <span className={styles.findpwd_body_hover}>邮箱找回密码</span>
                <h3 className={styles.findpwd_body_title}>手机号找回密码</h3>
                <form className={styles.findpwd_body_form}>

                    <div>
                        <label className={styles.findpwd_body_label} htmlFor="userType">我是</label>
                        <div className={styles.findpwd_body_userType}>
                            <label htmlFor="user" className={styles.user_type}>
                                <input
                                    id="user"
                                    type="radio"
                                    name="user_type"
                                    value="0"
                                    defaultChecked="defaultChecked"
                                />普通用户</label>
                            <label htmlFor="expert" className={styles.user_type}>
                                <input
                                    id="expert"
                                    type="radio"
                                    name="user_type"
                                    value="2"
                                />顾问</label>
                        </div>

                        <label className={styles.findpwd_body_label} htmlFor="phone">手机号码</label>
                        <input
                            ref="phone"
                            onBlur={this.phoneBlur}
                            className={styles.findpwd_body_text}
                            id="phone"
                            type="text"
                            placeholder="请输入您的手机号"/>

                        <label className={styles.findpwd_body_label} htmlFor="validate">短信验证码</label>
                        <input
                            ref="testCode"
                            className={styles.findpwd_body_validate}
                            id="validate"
                            type="text"
                            placeholder="请输入短信验证码"/>
                        <span className={styles.findpwd_body_getvali}>免费获取</span>

                        <input
                            onClick={this.handleClick}
                            className={styles.findpwd_body_btn}
                            type="button"
                            value="确定"/>
                    </div>

                    <div style={{display: "none"}}>
                        <label className={styles.findpwd_body_label} htmlFor="old_pwd">旧密码</label>
                        <input
                            className={styles.findpwd_body_pwd}
                            id="old_pwd"
                            type="password"
                            placeholder="请输入您的旧密码"/>

                        <label className={styles.findpwd_body_label} htmlFor="set_pwd">设置新密码</label>
                        <input
                            className={styles.findpwd_body_pwd}
                            id="set_pwd"
                            type="password"
                            placeholder="请输入您的新密码"/>

                        <label className={styles.findpwd_body_label} htmlFor="sure_pwd">确认新密码</label>
                        <input
                            className={styles.findpwd_body_pwd}
                            id="sure_pwd"
                            type="password"
                            placeholder="请再次输入您的新密码"/>

                        <input
                            className={styles.findpwd_body_btn}
                            type="button"
                            value="提交"/>
                    </div>

                </form>
            </div>
        );
    }
}
FindPwdBody.contextTypes = {
    router: React.PropTypes.object
};

export default FindPwdComponent;