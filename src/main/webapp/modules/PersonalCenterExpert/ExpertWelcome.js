import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/personalCenter.css';
import avatar from '../../public/images/expert.jpg';

class ExpertWelcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expertHeadPicture: '',
            expertNickname: '',
            expertTel: ''
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestExpertInfo(this));
    }
    render(){
        let headPic = this.state.expertHeadPicture;
        let imgDom;
        if(headPic == ''){
            imgDom = <img src={avatar} alt="顾问头像"/>
        }else{
            imgDom = <img src={"/gp/" + headPic} alt="顾问头像"/>
        }
        return(
            <div className={styles.personal_avatar}>
                {imgDom}
                <span>欢迎您！{this.state.expertNickname ? this.state.expertNickname : this.state.expertTel}</span>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertWelcome);