import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isCorrectAge, isCorrectGpa } from '../../utils/validate';
import { Star } from '../Common/CommonComponent';
import styles from '../../public/styles/user/myInfo.css';

class MyInfoEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFileChanged: false,
            avatarSize: '',
            fileValue: '',
            fileLoc: '',
            userPictureContent: "",

            userName: "",
            userSex: 0,
            userPwd: "",
            userAge: 0,
            userNickname: "",
            userTel: "",
            userEmail: "",
            userEducation: "",
            userCampus: "",
            userMajor: "",
            userGpa: 0,
            userLocation: "",
            testCode: "",
            button: '提交'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        this.setState({button: '提交中...'});
        let { actions, dispatch } = this.props;
        if( !this.state.userTel ){
            alert('红星标记必填项！手机号码');
            this.setState({button: '提交'});
        }
        else if( !this.state.userPwd ){
            alert('红星标记必填项！密码');
            this.setState({button: '提交'});
        }
        else if( !isCorrectAge(this.state.userAge) ){
            alert('年龄输入有误，1-100之间的数字');
            this.setState({button: '提交'});
        }
        else if( !isCorrectGpa(this.state.userGpa) ){
            alert('GPA输入有误，0-5之间的数字');
            this.setState({button: '提交'});
        }
        else if( !this.state.userPictureContent ){
            alert('红星标记必填项！头像');
            this.setState({button: '提交'});
        }
        else if( this.state.avatarSize > 1000000 ){
            alert('图片太大，请重传！avatarSize');
            this.setState({button: '提交'});
        }
        else{
            let formData = new FormData();
            formData.append("userPictureContent", this.state.userPictureContent);
            formData.append("userName", this.state.userName);
            formData.append("userSex", this.state.userSex);
            formData.append("userPwd", this.state.userPwd);
            formData.append("userAge", this.state.userAge);
            formData.append("userNickname", this.state.userNickname);
            formData.append("userTel", this.state.userTel);
            formData.append("userEmail", this.state.userEmail);
            formData.append("userEducation", this.state.userEducation);
            formData.append("userCampus", this.state.userCampus);
            formData.append("userMajor", this.state.userMajor);
            formData.append("userGpa", this.state.userGpa);
            formData.append("userLocation", this.state.userLocation);
            dispatch(actions.updateUserInfo(formData, this));
        }
    }
    render(){
        return (
            <div className={styles.edit_basic_info}>
                <form className={styles.edit_info_form}
                      encType="multipart/form-data"
                      id="infoForm">

                    <label className={styles.edit_info_label} htmlFor="phone"><Star/>手机号码</label>
                    <input
                        onChange={ (e) => { this.setState({ userTel: e.target.value }) } }
                        name="userTel"
                        className={styles.edit_info_phone}
                        id="phone"
                        type="text"
                        placeholder="请输入您的手机号码"/>

                    <label className={styles.edit_info_label} htmlFor="validate">短信验证码</label>
                    <input
                        onChange={ (e) => { this.setState({ testCode: e.target.value }) } }
                        name="testCode"
                        className={styles.edit_info_validate}
                        id="validate"
                        type="text"
                        placeholder="请输入短信验证码"/>
                    <span className={styles.edit_info_getvali}>免费获取</span>

                    <label className={styles.edit_info_label} htmlFor="name">真实姓名</label>
                    <input
                        onChange={ (e) => { this.setState({ userName: e.target.value }) } }
                        name="userName"
                        className={styles.edit_info_name}
                        id="name"
                        type="text"
                        placeholder="请输入您的真实姓名"/>

                    <label className={styles.edit_info_label} htmlFor="sex">性别</label>
                    <div ref="sex"
                         className={styles.edit_info_sex}
                         onChange={ (e) => {this.setState({userSex: e.target.value})} }
                    >
                        <label htmlFor="male" className={styles.user_sex}>
                            <input
                                id="male"
                                type="radio"
                                name="user_sex"
                                value={0}
                                defaultChecked="defaultChecked"
                            />男</label>

                        <label htmlFor="female" className={styles.user_sex}>
                            <input
                                id="female"
                                type="radio"
                                name="user_sex"
                                value={1}

                            />女</label>

                    </div>

                    <label className={styles.edit_info_label} htmlFor="pwd"><Star/>密码</label>
                    <input
                        onChange={ (e) => { this.setState({ userPwd: e.target.value }) } }
                        name="userPwd"
                        className={styles.edit_info_sex}
                        id="pwd"
                        type="password"
                        placeholder="请输入您的密码"/>

                    <label className={styles.edit_info_label} htmlFor="age">年龄</label>
                    <input
                        onChange={ (e) => { this.setState({ userAge: e.target.value }) } }
                        name="userAge"
                        className={styles.edit_info_age}
                        id="age"
                        type="text"
                        placeholder="请输入您的年龄"/>

                    <label className={styles.edit_info_label} htmlFor="nickname">昵称</label>
                    <input
                        onChange={ (e) => { this.setState({ userNickname: e.target.value }) } }
                        name="userNickname"
                        className={styles.edit_info_nickname}
                        id="nickname"
                        type="text"
                        placeholder="请输入您的昵称"/>

                    <label className={styles.edit_info_label} htmlFor="avatar"><Star/>头像</label>
                    <span className={styles.edit_info_avatar}>
                        <span>{ this.state.isFileChanged ? (this.state.fileValue) : ("选择头像上传") }</span>
                        <input
                            onChange={ (e) => {
                                let avatar = this.refs.picFile;
                                let userPictureContent = avatar.files[0];
                                let avatarSize = avatar.files[0].size;
                                let avatarBlob = window.URL.createObjectURL(avatar.files[0]);
                                this.setState({
                                    isFileChanged: true,
                                    avatarSize: avatarSize,
                                    fileValue: e.target.value,
                                    fileLoc: avatarBlob,
                                    userPictureContent: userPictureContent
                                });
                            } }
                            ref="picFile"
                            name="pic"
                            id="avatar"
                            type="file"/>
                    </span>

                    <label className={styles.edit_info_label} htmlFor="now_education">当前学历</label>
                    <input
                        onChange={ (e) => { this.setState({ userEducation: e.target.value }) } }
                        name="userEducation"
                        className={styles.edit_info_now_education}
                        id="now_education"
                        type="text"
                        placeholder="请输入您的当前学历"/>

                    <label className={styles.edit_info_label} htmlFor="now_school">当前学校</label>
                    <input
                        onChange={ (e) => { this.setState({ userCampus: e.target.value }) } }
                        name="userCampus"
                        className={styles.edit_info_now_school}
                        id="now_school"
                        type="text"
                        placeholder="请输入您的当前学校"/>

                    {/*<label className={styles.edit_info_label} htmlFor="now_college">当前学院</label>
                    <input
                        name : "",
                        className={styles.edit_info_now_college}
                        id="now_college"
                        type="text"
                        placeholder="请输入您的当前学院"/>*/}

                    <label className={styles.edit_info_label} htmlFor="major">当前专业</label>
                    <input
                        onChange={ (e) => { this.setState({ userMajor: e.target.value }) } }
                        name="userMajor"
                        className={styles.edit_info_major}
                        id="major"
                        type="text"
                        placeholder="请输入您的当前专业"/>

                    <label className={styles.edit_info_label} htmlFor="gpa">GPA</label>
                    <input
                        onChange={ (e) => { this.setState({ userGpa: e.target.value }) } }
                        name="userGpa"
                        className={styles.edit_info_major}
                        id="gpa"
                        type="text"
                        placeholder="请输入您的专业GPA"/>

                    <label className={styles.edit_info_label} htmlFor="now_loc">所在地</label>
                    <input
                        onChange={ (e) => { this.setState({ userLocation: e.target.value }) } }
                        name="userLocation"
                        className={styles.edit_info_now_loc}
                        id="now_loc"
                        type="text"
                        placeholder="请输入您的所在地"/>

                    <label className={styles.edit_info_label} htmlFor="email">邮箱</label>
                    <input
                        onChange={ (e) => { this.setState({ userEmail: e.target.value }) } }
                        name="userEmail"
                        className={styles.edit_info_email}
                        id="email"
                        type="text"
                        placeholder="请输入您的邮箱"/>

                    <label className={styles.edit_info_btn_label}>提交</label>
                    <input
                        onClick={this.handleSubmit}
                        className={styles.edit_info_btn}
                        type="button"
                        value={this.state.button}/>

                    <label className={styles.edit_info_btn_label}>不修改</label>
                    <button
                        onClick={ () => {this.context.router.push('/personalCenter/basicInfo')} }
                        className={styles.not_edit}
                        type="button">
                        不修改
                    </button>

                </form>
            </div>
        )
    }
}
MyInfoEdit.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyInfoEdit);