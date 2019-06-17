import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import RegisterUserBody from './RegisterUserBody';
import logoBg from '../../public/images/logobg.png';
import logo from '../../public/images/azlx1.jpg';
import styles from '../../public/styles/user/register.css';

class UserRegister extends Component{
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
                <RegisterUserBody actions={actions}/>
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
                    <NavLink to="/register"> 普通用户注册</NavLink>
                </span>
            </div>
        );
    }
}

export default UserRegister;