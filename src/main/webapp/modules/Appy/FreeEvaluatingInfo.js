import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import { isCorrectGrade, isCorrectGpa } from '../../utils/validate';
import styles from '../../public/styles/user/evaluating.css';

class FreeEvaluatingInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            button: '提交评估',
            isEvaluateSuccess: false,

            evaluateEducation: '',
            evaluateCampus: '',
            evaluateCollege: '',
            evaluateMajor: '',
            evaluateGpa: '',
            evaluateScore: '',
            evaluateTarget: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        this.setState({button: '提交中...'});
        let { dispatch, actions } = this.props;
        let data = {};
        data.evaluateEducation = this.state.evaluateEducation;
        data.evaluateCampus = this.state.evaluateCampus;
        data.evaluateCollege = this.state.evaluateCollege;
        data.evaluateMajor = this.state.evaluateMajor;
        data.evaluateGpa = this.state.evaluateGpa;
        data.evaluateScore = this.state.evaluateScore;
        data.evaluateTarget = this.state.evaluateTarget;

        if(!data.evaluateEducation){
            alert('信息不完整！evaluateEducation');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateCampus){
            alert('信息不完整！evaluateCampus');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateCollege){
            alert('信息不完整！evaluateCollege');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateMajor){
            alert('信息不完整！evaluateMajor');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateGpa){
            alert('信息不完整！evaluateGpa');
            this.setState({button: '提交评估'});
        }
        else if(!isCorrectGpa(data.evaluateGpa)){
            alert('GPA输入有误，0-5之间的数字');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateScore){
            alert('信息不完整！evaluateScore');
            this.setState({button: '提交评估'});
        }
        else if(!isCorrectGrade(data.evaluateScore)){
            alert('平均成绩输入有误，1-100之间的数字');
            this.setState({button: '提交评估'});
        }
        else if(!data.evaluateTarget){
            alert('信息不完整！evaluateTarget');
            this.setState({button: '提交评估'});
        }
        else{
            dispatch(actions.submitEvaluating(data, this));
        }
    }
    render(){
        let infoTip = this.state.isEvaluateSuccess ? (
                <p>
                    尊敬的客户您好！您的评估表已经提交成功，我们已经根据信息为您推荐了合适的学校和产品，请前往
                    <NavLink to="/apply">申请页面</NavLink>查看相关推荐，以及申请。
                </p>
            ) : (
                <p>
                    尊敬的客户您好！请您填写下方相关信息！便于我们及时和您沟通！
                </p>
            );
        return (
            <div className={styles.evaluating_body} style={{marginTop: '145px'}}>

                <div className={styles.evaluating_alert}>
                    {infoTip}
                </div>

                <div className={styles.evaluating_info}>
                    <form className={styles.evaluating_form}>

                        <label className={styles.evaluating_label} htmlFor="now_education">当前学历</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateEducation: e.target.value})} }
                            className={styles.evaluating_now_education}
                            id="now_education"
                            type="text"
                            placeholder="请输入您的当前学历"/>

                        <label className={styles.evaluating_label} htmlFor="now_school">当前学校</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateCampus: e.target.value})} }
                            className={styles.evaluating_now_school}
                            id="now_school"
                            type="text"
                            placeholder="请输入您的当前所在学校"/>

                        <label className={styles.evaluating_label} htmlFor="now_college">当前学院</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateCollege: e.target.value})} }
                            className={styles.evaluating_now_college}
                            id="now_college"
                            type="text"
                            placeholder="请输入您的当前所在学院"/>

                        <label className={styles.evaluating_label} htmlFor="now_major">当前专业</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateMajor: e.target.value})} }
                            className={styles.evaluating_now_major}
                            id="now_major"
                            type="text"
                            placeholder="请输入您的当前所学专业"/>

                        <label className={styles.evaluating_label} htmlFor="gpa">GPA</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateGpa: e.target.value})} }
                            className={styles.evaluating_gpa}
                            id="gpa"
                            type="text"
                            placeholder="请输入您的GPA"/>

                        <label className={styles.evaluating_label} htmlFor="avg_grade">平均成绩</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateScore: e.target.value})} }
                            className={styles.evaluating_avg_grade}
                            id="avg_grade"
                            type="text"
                            placeholder="请输入您的平均成绩"/>

                        <label className={styles.evaluating_label} htmlFor="target">目标</label>
                        <input
                            onChange={ (e) => {this.setState({evaluateTarget: e.target.value})} }
                            className={styles.evaluating_target}
                            id="target"
                            type="text"
                            placeholder="请输入高中,本科或研究生"/>

                        <label className={styles.evaluating_btn_label}>提交评估</label>
                        <input
                            onClick={this.handleSubmit}
                            className={styles.evaluating_btn}
                            type="button"
                            value={this.state.button}/>
                    </form>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {state: state}
};
export default connect(mapStateToProps)(FreeEvaluatingInfo);