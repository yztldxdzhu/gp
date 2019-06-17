import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/personalCenter.css';
import avatar from '../../public/images/me.jpg';

class UserWelcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userHeadPicture: '',
            userNickname: '',
            userTel: ''
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestUserInfo(this));
    }
    render(){
        let headPic = this.state.userHeadPicture;
        let imgDom;
        if(headPic == ''){
            imgDom = <img src={avatar} alt="用户头像"/>
        }else{
            imgDom = <img src={"/gp/"+headPic} alt="用户头像"/>
        }
        return(
            <div className={styles.personal_avatar}>
                {imgDom}
                <span>欢迎您！{this.state.userNickname ? this.state.userNickname : this.state.userTel}</span>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(UserWelcome);