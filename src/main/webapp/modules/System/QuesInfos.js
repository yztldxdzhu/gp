import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class QuesInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noVerifyQuestionList: [],//未审核列表
            passedQuestionList: [],//审核通过列表
            noPassedQuestionList: [], //审核不通过列表
            status: 'unchecked'
        };
        this.checkQues = this.checkQues.bind(this);
        this.checkQuesNot = this.checkQuesNot.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllQuestions(this));
    }
    checkQues(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.questionId = e.target.id;
        data.questionIspassed = 1;
        dispatch(actions.verifyQues(data, this));
    }
    checkQuesNot(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.questionId = e.target.id;
        data.questionIspassed = 2;
        dispatch(actions.verifyQues(data, this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>问题管理</p>
                <ul className={styles.apply_condi}>
                    <li
                        id="unchecked"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'unchecked' ? '#a22020' : '#ffffff'}}>未审核</li>
                    <li
                        id="passed"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'passed' ? '#a22020' : '#ffffff'}}>审核通过</li>
                    <li
                        id="unpassed"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'unpassed' ? '#a22020' : '#ffffff'}}>审核不通过</li>
                </ul>

                {this.state.noVerifyQuestionList.map( (uncheckedQues, i) => {
                    return (
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'unchecked' ? 'block' : 'none'}}>
                            <ul>
                                <li>{uncheckedQues.questionContent ? uncheckedQues.questionContent : '无'}</li>
                                <li>
                                    <form className={styles.apply_check_form}>
                                        <button type="button" id={uncheckedQues.questionId} onClick={this.checkQues}>通过</button>
                                        <button type="button" id={uncheckedQues.questionId} onClick={this.checkQuesNot}>不通过</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    )
                } )}
                {this.state.passedQuestionList.map( (checkedQues, i) => {
                    return(
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'passed' ? 'block' : 'none'}}>
                            <ul>
                                <li>{checkedQues.questionContent ? checkedQues.questionContent : '无'}</li>
                                <li>已审核并通过申请</li>
                            </ul>
                        </div>
                    )
                } )}
                {this.state.noPassedQuestionList.map( (noPassQues, i) => {
                    return(
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'unpassed' ? 'block' : 'none'}}>
                            <ul>
                                <li>{noPassQues.questionContent ? noPassQues.questionContent : '无'}</li>
                                <li>已审核但申请不通过</li>
                            </ul>
                        </div>
                    )
                } )}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(QuesInfos);