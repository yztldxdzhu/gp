import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class ExpertInfoShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            expertId: '',
            expertName: '',
            expertNickname: '',
            expertTel: '',
            expertPwd: '',
            expertAvator: '',
            expertHeadPicture: '',
            expertPictureContent: '',
            expertLocation: '',
            expertEducation: '',
            expertCampus: '',
            expertCollege: '',
            expertEmail: '',
            expertMajor: '',
            expertAbroadexp: '',
            expertAbroadyear: '',
            expertStatus: '',
            tagList: '',
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestExpertInfo(this));
    }
    render(){
        return (
            <div className={styles.info_right}>
                <p>
                    <span>姓名：</span>
                    <span>{this.state.expertName ? this.state.expertName : "无"}</span>
                </p>
                <p>
                    <span>昵称：</span>
                    <span>{this.state.expertNickname ? this.state.expertNickname : "无"}</span>
                </p>
                <p>
                    <span>性别：</span>
                    <span>{this.state.expertSex ? this.state.expertSex : "无"}</span>
                </p>
                <p>
                    <span>年龄：</span>
                    <span>{this.state.expertAge ? this.state.expertAge : "无"}</span>
                </p>
                <p>
                    <span>手机号：</span>
                    <span>{this.state.expertTel ? this.state.expertTel : "无"}</span>
                </p>
                <p>
                    <span>邮箱号：</span>
                    <span>{this.state.expertEmail ? this.state.expertEmail : "无"}</span>
                </p>
                <p>
                    <span>所在地：</span>
                    <span>{this.state.expertLocation ? this.state.expertLocation : "无"}</span>
                </p>

                <p>
                    <span>学历：</span>
                    <span>{this.state.expertEducation ? this.state.expertEducation : "无"}</span>
                </p>
                <p>
                    <span>学校：</span>
                    <span>{this.state.expertCampus ? this.state.expertCampus : "无"}</span>
                </p>
                <p>
                    <span>学院：</span>
                    <span>{this.state.expertCollege ? this.state.expertCollege : "无"}</span>
                </p>
                <p>
                    <span>专业：</span>
                    <span>{this.state.expertMajor ? this.state.expertMajor : "无"}</span>
                </p>

                <p>
                    <span>标签：</span>
                    <span>{this.state.tagList == [] ? '无' : this.state.tagList.map( (tag) => {return tag.tagContent + ','} )}</span>
                </p>
                <p>
                    <span>几年海外留学经验：</span>
                    <span>{this.state.expertAbroadyear ? this.state.expertAbroadyear : "无"}</span>
                </p>
                <p>
                    <span>海外留学经历：</span>
                    <span>{this.state.expertAbroadexp ? this.state.expertAbroadexp : "无"}</span>
                </p>

                <p className={styles.edit_info}>
                    <NavLink to="/personalCenterExpert/editBasicInfo">修改</NavLink>
                </p>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertInfoShow);