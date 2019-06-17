import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class MyInfoShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            expertId: '',
            userAge: 0,
            userCampus: '',
            userEducation: '',
            userEmail: '',
            userGpa: '',
            userHeadPicture: '',
            userId: '',
            userLocation: '',
            userMajor: '',
            userName: '',
            userNickname: '',
            userPwd: '',
            userSex: 0,
            userTel: '',
            userType: '',
            applyInfos: [],
            applicationTarget: '',
            applicationCampus: '',
            applicationCollege: '',
            applicationMajor: '',
            applicationLocation: '',
            applicationReadingTime: ''
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestUserInfo(this));
    }
    render(){
        return (
            <div className={styles.info_right}>
                <p>
                    <span>姓名：</span>
                    <span>{this.state.userName ? this.state.userName : "无"}</span>
                </p>
                <p>
                    <span>性别：</span>
                    <span>{this.state.userSex}</span>
                </p>
                <p>
                    <span>年龄：</span>
                    <span>{this.state.userAge == 0 ? "默认为0" : this.state.userAge}</span>
                </p>
                <p>
                    <span>昵称：</span>
                    <span>{this.state.userNickname ? this.state.userNickname : "无"}</span>
                </p>
                <p>
                    <span>手机号：</span>
                    <span>{this.state.userTel ? this.state.userTel : "无"}</span>
                </p>
                <p>
                    <span>邮箱号：</span>
                    <span>{this.state.userEmail ? this.state.userEmail : "无"}</span>
                </p>
                <p>
                    <span>所在地：</span>
                    <span>{this.state.userLocation ? this.state.userLocation : "无"}</span>
                </p>

                <p>
                    <span>当前学历：</span>
                    <span>{this.state.userEducation ? this.state.userEducation : "无"}</span>
                </p>
                <p>
                    <span>当前学校：</span>
                    <span>{this.state.userCampus ? this.state.userCampus : "无"}</span>
                </p>
                {/*<p>
                    <span>当前学院：</span>
                    <span>{this.state.userName ? this.state.userName : "无"}</span>
                </p>*/}
                <p>
                    <span>当前专业：</span>
                    <span>{this.state.userMajor ? this.state.userMajor : "无"}</span>
                </p>
                <p>
                    <span>GPA：</span>
                    <span>{this.state.userGpa == 0 ? "默认为0" : this.state.userGpa}</span>
                </p>
                {/*<p>
                    <span>平均成绩：</span>
                    <span>{this.state.userName ? this.state.userName : "无"}</span>
                </p>*/}

                <p>
                    <span>目标：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationTarget + ','} )}</span>
                </p>
                <p>
                    <span>意向学校：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationCampus + ','} )}</span>
                </p>
                <p>
                    <span>意向学院：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationCollege + ','} )}</span>
                </p>
                <p>
                    <span>意向专业：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationMajor + ','} )}</span>
                </p>
                <p>
                    <span>目标地区：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationLocation + ','} )}</span>
                </p>
                <p>
                    <span>入学时间：</span>
                    <span>{this.state.applyInfos == [] ? '无' : this.state.applyInfos.map( (applyInfo) => {return applyInfo.applicationReadingTime + ','} )}</span>
                </p>

                <p className={styles.edit_info}>
                    <NavLink to="/personalCenter/editBasicInfo">修改</NavLink>
                </p>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyInfoShow);