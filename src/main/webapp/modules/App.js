import React , { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/action';
import 'normalize.css';
import styles from '../public/styles/user/app.css';

//在这里面主要是需要一个登陆的状态贯穿全局。
class AppComponent extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        let { dispatch } = this.props;
        // console.log('this.props,', this.props);
        // console.log('dispatch', dispatch);

        if( window.localStorage.getItem('loginInfo') ){
            const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
            // dispatch(actions.requestLogin( loginInfo.userType, loginInfo.account, loginInfo.pwd ));
            // dispatch(actions.requestUserInfo(masterInfo.userId));
        }
    }
    render(){
        // let { state, dispatch } = this.props;
        return (
            <div className={styles.main}>
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(AppComponent);