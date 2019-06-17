import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import LoginBody from './LoginBody';
import logoBg from '../../public/images/logobg.png';
import logo from '../../public/images/azlx1.jpg';
import styles from '../../public/styles/user/login.css';

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            domHeight: ''
        };

    };
    componentWillMount(){
        let domHeight = document.body.clientHeight || document.documentElement.clientHeight;
        this.setState({
            domHeight: domHeight
        });
    };
    componentDidMount(){
        let _self = this;
        /*setTimeout(() =>{
            _self.setState({domHeight: '400px'})
        },1000);*/
    }
    render(){
        return (
            <div style={{
                width: '100%',
                height: this.state.domHeight,
                background: 'url(' + logoBg + ')',
                backgroundSize: '100% 100%',
                backgroundPostion: 'center',
            }}>
                <LoginHeader />
                <LoginBody actions={actions}/>
            </div>
        )
    };
}
class LoginHeader extends Component{
    render(){
        return (
            <div className={styles.login_header}>
                <NavLink to="/">
                    <img
                        className={styles.login_header_img}
                        src={logo}
                        alt="澳洲留学"
                        width='70px'
                        height='46px' />
                </NavLink>
                <span className={styles.login_header_title}>
                    <NavLink to="/">澳洲留学 </NavLink>
                    |
                    <NavLink to="/login"> 用户登陆</NavLink>
                </span>
            </div>
        );
    }
}

export default LoginComponent;
/*export default connect(
    (state) => {
        return {
            UserReducer: state.UserReducer
        };
    },
    action('UserReducer')
)(LoginComponent);*/
