import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { isPhone, isCorrectPwd, isCorrectValiCode } from '../../utils/validate';

import NavLink from '../Common/NavLink';

import logoBg from '../../public/images/logobg.png';
import logo from '../../public/images/azlx1.jpg';

import styles from '../../public/styles/user/register.css';

class RegisterComponent extends Component{

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
                <RegisterBody />
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
                    <NavLink to="/register"> 注册</NavLink>
                </span>
            </div>
        );
    }
}

class RegisterBody extends Component{
    render(){
        return(
            <div className={styles.register_body_all}>
                <p className={styles.register_body_p}><NavLink to="/userReg">普通用户注册</NavLink></p>
                <p className={styles.register_body_p}><NavLink to="/expertReg">顾问注册</NavLink></p>
            </div>
        )
    }
}

export default RegisterComponent;