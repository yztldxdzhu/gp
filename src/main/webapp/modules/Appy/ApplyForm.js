import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/apply.css';

class ApplyInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            button: '提交申请',

            universityList: [],
            universityId: 0,
            collegeList: [],
            collegeId: 0,
            majorList: [],

            applicationTarget: '研究生',
            applicationLocation: '澳洲首都特区',
            applicationCampus: '',
            applicationCollege: '',
            applicationMajor: '',
            applicationReadingTime: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ajaxSuccess = this.ajaxSuccess.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        let data = {};
        data.universityState = "澳洲首都特区";
        dispatch(actions.requestUniByState(data, this));
    }
    ajaxSuccess(value){
        this.props.changeApplyState(value);
    }
    handleSubmit(){
        this.setState({button: '提交中...'});
        let { dispatch, actions } = this.props;
        let data = {};
        data.applicationTarget = this.state.applicationTarget;
        data.applicationCampus = this.state.applicationCampus;
        data.applicationCollege = this.state.applicationCollege;
        data.applicationMajor = this.state.applicationMajor;
        data.applicationReadingTime = this.state.applicationReadingTime;
        data.applicationLocation = this.state.applicationLocation;
        if(!data.applicationTarget){
            alert('信息不完整！applicationTarget');
            this.setState({button: '提交申请'});
        }
        else if(!data.applicationCampus){
            alert('信息不完整！applicationCampus');
            this.setState({button: '提交申请'});
        }
        else if(!data.applicationCollege){
            alert('信息不完整！applicationCollege');
            this.setState({button: '提交申请'});
        }
        else if(!data.applicationMajor){
            alert('信息不完整！applicationMajor');
            this.setState({button: '提交申请'});
        }
        else if(!data.applicationReadingTime){
            alert('信息不完整！applicationReadingTime');
            this.setState({button: '提交申请'});
        }
        else if(!data.applicationLocation){
            alert('信息不完整！applicationLocation');
            this.setState({button: '提交申请'});
        }
        else{
            dispatch(actions.submitApply(data, this));
        }
    }
    render(){
        return (
            <div className={styles.apply_body}>
                <form className={styles.apply_body_form}>
                    <label className={styles.apply_body_label} htmlFor="target">目标</label>
                    <select
                        id="target"
                        className={styles.apply_body_base}
                        onChange={ (e) => {
                            this.setState({applicationTarget: e.target.value});
                        } }
                    >
                        <option value="研究生">研究生</option>
                        <option value="本科">本科</option>
                        <option value="高中">高中</option>
                    </select>

                    <label className={styles.apply_body_label} htmlFor="loc">目标地区</label>
                    <select 
                        id="loc"
                        className={styles.apply_body_base}
                        onChange={ (e) => {
                            this.setState({applicationLocation: e.target.value});
                            let {dispatch, actions} = this.props;
                            let data = {};
                            data.universityState = e.target.value;
                            dispatch(actions.requestUniByState(data, this));
                        } }
                    >
                        <option value="澳洲首都特区">澳洲首都特区</option>
                        <option value="新南威尔士州">新南威尔士州</option>
                        <option value="维多利亚州">维多利亚州</option>
                        <option value="西澳大利亚州">西澳大利亚州</option>
                        <option value="昆士兰州">昆士兰州</option>
                        <option value="塔斯马尼亚州">塔斯马尼亚州</option>
                        <option value="北领地">北领地</option>
                    </select>

                    <label className={styles.apply_body_label} htmlFor="college">意向学校</label>
                    <select
                        id="college"
                        className={styles.apply_body_base}
                        onChange={ (e) => {
                            let value = e.target.value.split(',');
                            this.setState({universityId: value[0]});
                            this.setState({applicationCampus: value[1]});
                            let {dispatch, actions} = this.props;
                            let data = {};
                            data.universityId = value[0];
                            dispatch(actions.requestCollegeByUniId(data, this));
                        } }
                    >
                        {this.state.universityList.length == 0 || this.state.universityList == null ? (
                                <option value="">暂无数据</option>
                            ) : (
                                this.state.universityList.map((uni, i) => {
                                    return(
                                        <option
                                            value={uni.universityId+','+uni.universityName}
                                            key={i}>{uni.universityName}</option>
                                    )
                                })
                            )}

                    </select>

                    <label className={styles.apply_body_label} htmlFor="school">意向学院</label>
                    <select
                        id="school"
                        className={styles.apply_body_base}
                        onChange={ (e) => {
                            let value = e.target.value.split(',');
                            this.setState({collegeId: value[0]});
                            this.setState({applicationCollege: value[1]});
                            let {dispatch, actions} = this.props;
                            let data = {};
                            data.universityId = this.state.universityId;
                            data.collegeId = value[0];
                            dispatch(actions.requestMajorByUniAndCollege(data, this));
                        } }
                    >
                        {this.state.collegeList.length == 0 || this.state.collegeList == null ? (
                                <option value="">暂无数据</option>
                            ) : (
                                this.state.collegeList.map((college, i) => {
                                    return(
                                        <option
                                            value={college.collegeId+','+college.collegeName}
                                            key={i}>{college.collegeName}</option>
                                    )
                                })
                            )}
                    </select>

                    <label className={styles.apply_body_label} htmlFor="major">意向专业</label>
                    <select
                        id="major"
                        className={styles.apply_body_base}
                        onChange={ (e) => {
                            this.setState({applicationMajor: e.target.value});
                        } }
                    >
                        {this.state.majorList.length == 0 || this.state.majorList == null ? (
                                <option value="">暂无数据</option>
                            ) : (
                                this.state.majorList.map((major, i) => {
                                    return(
                                        <option
                                            value={major.majorId+','+major.majorName}
                                            key={i}>{major.majorName}</option>
                                    )
                                })
                            )}
                    </select>

                    <label className={styles.apply_body_label} htmlFor="time">时间</label>
                    <input
                        onChange={ (e) => {this.setState({applicationReadingTime: e.target.value})} }
                        className={styles.apply_body_time}
                        id="time"
                        type="text"
                        placeholder="请输入您准备就读的时间,如2017-09-01"/>

                    <label className={styles.apply_body_btn_label}>提交申请</label>
                    <input
                        onClick={ this.handleSubmit }
                        className={styles.apply_body_btn}
                        type="button"
                        value="提交申请"/>
                </form>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {state: state}
};
export default connect(mapStateToProps)(ApplyInfo);