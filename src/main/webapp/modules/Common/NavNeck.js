import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from './NavLink';
import styles from '../../public/styles/user/common.css';

class NavNeck extends Component {
    constructor(){
        super();
    }
    render(){
        let { state } = this.props;

        let freeEvaluating = (state.LoginReducers.success && (state.LoginReducers.userType == 0)) ?
            (<li><NavLink to="/freeEvaluating">免费评估</NavLink></li>) :
            (<li onClick={ () => {alert('如果您是普通用户，请登录后再进行操作！顾问无法查看！')} } style={{cursor: 'pointer'}}>免费评估</li>);

        let apply = (state.LoginReducers.success && (state.LoginReducers.userType == 0)) ?
            (<li><NavLink to="/apply">我要申请</NavLink></li>) :
            (<li onClick={ () => {alert('如果您是普通用户，请登录后再进行操作！顾问无法查看！')} } style={{cursor: 'pointer'}}>我要申请</li>);

        let personalCenter = '';

        if((state.LoginReducers.success && (state.LoginReducers.userType == 0))){
            personalCenter = (<li><NavLink to="/personalCenter/basicInfo">个人中心</NavLink></li>);
        }else if((state.LoginReducers.success && (state.LoginReducers.userType == 2))){
            personalCenter = (<li><NavLink to="/personalCenterExpert/basicInfo">个人中心</NavLink></li>);
        }else{
            personalCenter = (<li onClick={ () => {alert('如果您是普通用户，请登录后再进行操作！')} } style={{cursor: 'pointer'}}>个人中心</li>);
        }

        return (
            <nav className={styles.nav_neck}>
                <ul>
                    <li><IndexLink to="/" onlyActiveOnIndex={true}>返回首页</IndexLink></li>
                    {freeEvaluating}
                    {apply}
                    <li><NavLink to="/studyMall">留学商城</NavLink></li>
                    <li><NavLink to="/collegeLibrary">澳洲院校库</NavLink></li>
                    <li><NavLink to="/successCase">成功案例</NavLink></li>
                    <li><NavLink to="/advisories">咨询社区</NavLink></li>
                    <li><NavLink to="/experts">找寻顾问</NavLink></li>
                    {personalCenter}
                </ul>
            </nav>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(NavNeck);