import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import RegisterExpertBody from './RegisterExpertBody';
import logoBg from '../../public/images/logobg.png';
import logo from '../../public/images/azlx1.jpg';
import styles from '../../public/styles/user/register.css';

class ExpertRegister extends Component{

    constructor(props){
        super(props);
        this.state = {
            domHeight: ''
        }
    };

    componentWillMount(){
        const domHeight = document.body.clientHeight || document.documentElement.clientHeight;
        this.setState({
            domHeight: domHeight
        });
    };

    render(){
        return (
            <div style={{
                height: this.state.domHeight,
                background: 'url(' + logoBg + ')',
                backgroundSize: '100% 100%'
            }}>
                <RegisterHeader />
                <RegisterExpertBody actions={actions}/>
            </div>
        )
    }
}
class RegisterHeader extends Component{
    render(){
        return (
            <div className={styles.register_header}>
                <NavLink to="/">
                    <img
                        className={styles.register_header_img}
                        src={logo}
                        alt="澳洲留学"
                        width='70px'
                        height='46px' />
                </NavLink>
                <span className={styles.register_header_title}>
                    <NavLink to="/">澳洲留学 </NavLink>
                    |
                    <NavLink to="/register"> 顾问注册</NavLink>
                </span>
            </div>
        );
    }
}


class RegisterBody1 extends Component{
    render(){
        return (
            <div className={styles.register_body}>

                <form className={styles.register_body_form}>

                    <label className={styles.register_body_label} htmlFor="education">学历</label>
                    <input
                        className={styles.register_body_text}
                        id="education"
                        type="text"
                        placeholder="请输入您的最高学历"/>

                    <label className={styles.register_body_label} htmlFor="school">学校</label>
                    <input
                        className={styles.register_body_text}
                        id="school"
                        type="text"
                        placeholder="请输入您最高学历所在学校"/>

                    <label className={styles.register_body_label} htmlFor="college">学院</label>
                    <input
                        className={styles.register_body_text}
                        id="college"
                        type="text"
                        placeholder="请输入您最高学历所在学院"/>

                    <label className={styles.register_body_label} htmlFor="major">专业</label>
                    <input
                        className={styles.register_body_text}
                        id="major"
                        type="text"
                        placeholder="请输入您最高学历所学专业"/>

                    <label className={styles.register_body_label} htmlFor="years">几年</label>
                    <input
                        className={styles.register_body_text}
                        id="years"
                        type="text"
                        placeholder="请输入您有几年海外留学经验"/>


                    <input
                        className={styles.register_body_btn}
                        type="button"
                        value="注册"/>
                </form>
                <p className={styles.register_body_tologin}>
                    <NavLink to="/login">已有账号？立即登录</NavLink>
                </p>
            </div>
        );
    }
}

export default ExpertRegister;