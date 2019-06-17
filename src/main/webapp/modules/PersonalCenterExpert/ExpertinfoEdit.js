import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isCorrectAge } from '../../utils/validate';
import $ from 'jquery';
import { Star } from '../Common/CommonComponent';
import styles from '../../public/styles/user/myInfo.css';

/**
 * 标签的复选框
 * */
class TagCheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagNames: []
        }
    }
    componentDidMount(){
        let url = `http://localhost:8080/gp/tag/findAllTag`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) =>  {
                this.setState( {tagNames: res.tagList} );
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    }
    render(){
        let tagNames = this.state.tagNames;
        let optionDom = tagNames.map( (tag,i) => {
            return (
                <label htmlFor={tag.tagId} key={i} name="tag" className={styles.edit_info_tag_each}>
                    {tag.tagContent}
                    <input type="checkbox" id={tag.tagId} value={tag.tagContent} onChange={this.props.chooseTag}/>
                </label>
            )
        } );
        return (
            <div
                name="tag"
                id="tag"
                className={styles.edit_info_tag}
            >
                {optionDom}
            </div>
        )
    }
}

class ExpertinfoEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            button: '提交',

            isFileChanged: false,
            avatarSize: '',
            fileValue: '',
            fileLoc: '',
            expertPictureContent: '',

            expertTel: '',
            testCode: '',
            expertName: '',
            expertSex: 0,
            expertPwd: '',
            expertAge: '',
            expertNickName: '',
            expertEducation: '',
            expertCampus: '',
            expertCollege: '',
            expertMajor: '',
            expertLocation: '',
            expertEmail: '',
            expertAbroadyear: '',
            expertAbroadexp: '',

            tags: []
        };
        this.chooseTag = this.chooseTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    chooseTag(e){
        let tagName = e.target.value;
        let tagId = e.target.id;

        let tags = this.state.tags;
        let index = tags.indexOf(tagId);

        if( index > -1 ){
            tags.splice(index);
        }else{
            tags.push(tagId);
        }
        console.log(tags);
        this.setState({tags: tags});
    }
    handleSubmit(){
        this.setState({button: '提交中...'});
        let { actions, dispatch } = this.props;
        if( !this.state.expertTel ){
            alert('红星标记必填项！expertTel');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertPwd ){
            alert('红星标记必填项！expertPwd');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertPictureContent ){
            alert('红星标记必填项！expertPictureContent');
            this.setState({button: '提交'});
        }
        else if(this.state.avatarSize > 1000000){
            alert('图片太大，请重传！avatarSize');
            this.setState({button: '提交'});
        }
        else if( !isCorrectAge(this.state.expertAge) ){
            alert('年龄输入有误，1-100之间的数字');
            this.setState({button: '提交'});
        }
        /*
        else if( !this.state.expertNickName ){
            alert('红星标记必填项！expertNickName');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertEducation ){
            alert('红星标记必填项！expertEducation');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertCampus ){
            alert('红星标记必填项！expertCampus');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertCollege ){
            alert('红星标记必填项！expertCollege');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertMajor ){
            alert('红星标记必填项！expertMajor');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertAbroadyear ){
            alert('红星标记必填项！expertAbroadyear');
            this.setState({button: '提交'});
        }
        else if( !this.state.expertAbroadexp ){
            alert('红星标记必填项！expertAbroadexp');
            this.setState({button: '提交'});
        }
        */
        else if( this.state.tags.length == 0 ){
            alert('红星标记必填项！tags');
            this.setState({button: '提交'});
        }
        else {
            let formData = new FormData();
            formData.append("expertPictureContent", this.state.expertPictureContent);
            formData.append("expertName", this.state.expertName);
            formData.append("expertNickname", this.state.expertNickName);
            formData.append("expertPwd", this.state.expertPwd);
            formData.append("expertTel", this.state.expertTel);
            formData.append("expertAge", this.state.expertAge);
            formData.append("expertSex", this.state.expertSex);
            formData.append("expertEducation", this.state.expertEducation);
            formData.append("expertCampus", this.state.expertCampus);
            formData.append("expertCollege",this.state.expertCollege);
            formData.append("expertMajor", this.state.expertMajor);
            formData.append("expertEmail", this.state.expertEmail);
            formData.append("expertLocation", this.state.expertLocation);
            formData.append("expertAbroadexp", this.state.expertAbroadexp);
            formData.append("expertAbroadyear", this.state.expertAbroadyear);
            formData.append("tagString", this.state.tags.toString());

            dispatch(actions.updateExpertInfo(formData, this));
        }
    }
    render(){
        return (
            <div className={styles.edit_basic_info}>
                <form className={styles.edit_info_form}>
                    <label className={styles.edit_info_label} htmlFor="phone"><Star/>手机号码</label>
                    <input
                        onChange={ (e) => {this.setState({expertTel: e.target.value})} }
                        className={styles.edit_info_phone}
                        id="phone"
                        type="text"
                        placeholder="请输入您的手机号码"/>

                    <label className={styles.edit_info_label} htmlFor="validate">短信验证码</label>
                    <input
                        onChange={ (e) => {this.setState({testCode: e.target.value})} }
                        className={styles.edit_info_validate}
                        id="validate"
                        type="text"
                        placeholder="请输入短信验证码"/>
                    <span className={styles.edit_info_getvali}>免费获取</span>

                    <label className={styles.edit_info_label} htmlFor="name">真实姓名</label>
                    <input
                        onChange={ (e) => {this.setState({expertName: e.target.value})} }
                        className={styles.edit_info_name}
                        id="name"
                        type="text"
                        placeholder="请输入您的真实姓名"/>

                    <label className={styles.edit_info_label} htmlFor="sex">性别</label>
                    <div ref="sex"
                         className={styles.edit_info_sex}
                         onChange={ (e) => {this.setState({expertSex: e.target.value})} }
                    >
                        <label htmlFor="male" className={styles.user_sex}>
                            <input
                                id="male"
                                type="radio"
                                name="user_sex"
                                value={0}
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
                        onChange={ (e) => {this.setState({expertPwd: e.target.value})} }
                        name="userPwd"
                        className={styles.edit_info_sex}
                        id="pwd"
                        type="password"
                        placeholder="请输入您的密码"/>

                    <label className={styles.edit_info_label} htmlFor="age"><Star/>年龄</label>
                    <input
                        onChange={ (e) => {this.setState({expertAge: e.target.value})} }
                        className={styles.edit_info_age}
                        id="age"
                        type="text"
                        placeholder="请输入您的年龄"/>

                    <label className={styles.edit_info_label} htmlFor="nickname"><Star/>昵称</label>
                    <input
                        onChange={ (e) => {this.setState({expertNickName: e.target.value})} }
                        className={styles.edit_info_age}
                        id="nickname"
                        type="text"
                        placeholder="请输入您的昵称"/>

                    <label className={styles.edit_info_label} htmlFor="now_loc">所在地</label>
                    <input
                        onChange={ (e) => {this.setState({expertLocation: e.target.value})} }
                        className={styles.edit_info_now_loc}
                        id="now_loc"
                        type="text"
                        placeholder="请输入您的所在地"/>

                    <label className={styles.edit_info_label} htmlFor="email">邮箱</label>
                    <input
                        onChange={ (e) => {this.setState({expertEmail: e.target.value})} }
                        className={styles.edit_info_email}
                        id="email"
                        type="text"
                        placeholder="请输入您的邮箱"/>

                    <label className={styles.edit_info_label} htmlFor="avatar"><Star/>头像</label>
                    <span className={styles.edit_info_avatar}>
                        <span>{ this.state.isFileChanged ? (this.state.fileValue) : ("选择头像上传") }</span>
                        <input
                            onChange={ (e) => {
                                let avatar = this.refs.picFile;
                                let expertPictureContent = avatar.files[0];
                                let avatarSize = avatar.files[0].size;
                                let avatarBlob = window.URL.createObjectURL(avatar.files[0]);
                                this.setState({
                                    isFileChanged: true,
                                    avatarSize: avatarSize,
                                    fileValue: e.target.value,
                                    fileLoc: avatarBlob,
                                    expertPictureContent: expertPictureContent
                                });
                            } }
                            ref="picFile"
                            id="avatar"
                            type="file"/>
                    </span>

                    <label className={styles.edit_info_label} htmlFor="now_education"><Star/>学历</label>
                    <input
                        onChange={ (e) => {this.setState({expertEducation: e.target.value})} }
                        className={styles.edit_info_now_education}
                        id="now_education"
                        type="text"
                        placeholder="请输入您的最高学历"/>

                    <label className={styles.edit_info_label} htmlFor="now_school"><Star/>学校</label>
                    <input
                        onChange={ (e) => {this.setState({expertCampus: e.target.value})} }
                        className={styles.edit_info_now_school}
                        id="now_school"
                        type="text"
                        placeholder="请输入您最高学历所在学校"/>

                    <label className={styles.edit_info_label} htmlFor="now_college"><Star/>学院</label>
                    <input
                        onChange={ (e) => {this.setState({expertCollege: e.target.value})} }
                        className={styles.edit_info_now_college}
                        id="now_college"
                        type="text"
                        placeholder="请输入您最高学历所在学院"/>

                    <label className={styles.edit_info_label} htmlFor="major"><Star/>专业</label>
                    <input
                        onChange={ (e) => {this.setState({expertMajor: e.target.value})} }
                        className={styles.edit_info_major}
                        id="major"
                        type="text"
                        placeholder="请输入您最高学历所学专业"/>

                    <label className={styles.edit_info_label} htmlFor="abroad_year"><Star/>留学年数</label>
                    <input
                        onChange={ (e) => {this.setState({expertAbroadyear: e.target.value})} }
                        className={styles.edit_info_major}
                        id="abroad_year"
                        type="text"
                        placeholder="请输入您的留学年数"/>

                    <label className={styles.edit_info_label} htmlFor="tag"><Star/>标签</label>
                    <TagCheckBox chooseTag={this.chooseTag}/>

                    <label className={styles.edit_info_label} htmlFor="abroad_year"><Star/>留学经验</label>
                    <textarea
                        onChange={ (e) => {this.setState({expertAbroadexp: e.target.value})} }
                        className={styles.edit_info_exp}
                        name="description"
                        defaultValue="请输入您的留学经验" />

                    <label className={styles.edit_info_btn_label}>提交</label>
                    <input
                        onClick={this.handleSubmit}
                        className={styles.edit_info_btn}
                        type="button"
                        value="提交"/>

                    <label className={styles.edit_info_btn_label}>不修改</label>
                    <button
                        onClick={ () => {this.context.router.push('/personalCenterExpert/basicInfo')} }
                        className={styles.not_edit}
                        type="button">
                        不修改
                    </button>
                </form>
            </div>
        )
    }
}
ExpertinfoEdit.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertinfoEdit);