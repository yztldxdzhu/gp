import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';
import $ from 'jquery';

class ApplyInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noVerifyApplicationList: [],//未审核列表
            passApplicationList: [],//审核通过列表
            noPassApplicationList: [], //审核不通过列表
            status: 'unchecked'
        };
        this.checkApply = this.checkApply.bind(this);
        this.checkApplyNot = this.checkApplyNot.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllApplication(this));
    }
    checkApply(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.applicationId = e.target.id;
        data.ispassed = 1;
        dispatch(actions.verifyApplication(data, this));
    }
    checkApplyNot(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.applicationId = e.target.id;
        data.ispassed = 2;
        dispatch(actions.verifyApplication(data, this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>申请管理</p>
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
                <ul className={styles.the_each_head}>
                    <li>申请学校</li>
                    <li>申请专业</li>
                    <li>申请目标</li>
                    <li>审核申请</li>
                </ul>
                {this.state.noVerifyApplicationList.map( (uncheckedApply, i) => {
                    return (
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'unchecked' ? 'block' : 'none'}}>
                            <ul>
                                <li>{uncheckedApply.applicationCampus ? uncheckedApply.applicationCampus : '无'}</li>
                                <li>{uncheckedApply.applicationMajor ? uncheckedApply.applicationMajor : '无'}</li>
                                <li>{uncheckedApply.applicationTarget ? uncheckedApply.applicationTarget : '无'}</li>
                                <li>
                                    <form className={styles.apply_check_form}>
                                        <button type="button" id={uncheckedApply.applicationId} onClick={this.checkApply}>通过</button>
                                        <button type="button" id={uncheckedApply.applicationId} onClick={this.checkApplyNot}>不通过</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    )
                } )}
                {this.state.passApplicationList.map( (checkedApply, i) => {
                    return(
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'passed' ? 'block' : 'none'}}>
                            <ul>
                                <li>{checkedApply.applicationCampus ? checkedApply.applicationCampus : '无'}</li>
                                <li>{checkedApply.applicationMajor ? checkedApply.applicationMajor : '无'}</li>
                                <li>{checkedApply.applicationTarget ? checkedApply.applicationTarget : '无'}</li>
                                <li>已审核并通过申请</li>
                            </ul>
                        </div>
                    )
                } )}
                {this.state.noPassApplicationList.map( (noPassApply, i) => {
                    return(
                        <div className={styles.the_each} key={i} style={{display: this.state.status == 'unpassed' ? 'block' : 'none'}}>
                            <ul>
                                <li>{noPassApply.applicationCampus ? noPassApply.applicationCampus : '无'}</li>
                                <li>{noPassApply.applicationMajor ? noPassApply.applicationMajor : '无'}</li>
                                <li>{noPassApply.applicationTarget ? noPassApply.applicationTarget : '无'}</li>
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
export default connect(mapStateToProps)(ApplyInfos);