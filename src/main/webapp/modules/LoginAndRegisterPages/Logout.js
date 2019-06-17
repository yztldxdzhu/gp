import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import logoutImg from '../../public/images/logout.png';

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(){
        alert('确定退出登陆么？');
        let { actions, dispatch } = this.props;
        dispatch(actions.logout());
    }
    render(){
        return (
            <img onClick={this.handleLogout}
                 src={logoutImg}
                 alt="退出登录"
                 title="退出登录"
                 width={16}
                 height={16}/>
        )
    }
}
Logout.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return {state: state}
};
export default connect(mapStateToProps)(Logout);