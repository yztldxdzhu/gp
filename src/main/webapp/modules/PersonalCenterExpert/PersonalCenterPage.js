import React, {Component} from 'react';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import ExpertWelcome from './ExpertWelcome';
import styles from '../../public/styles/user/personalCenter.css';

class PersonalCenterExpert extends Component{
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <div className={styles.personal_content} style={{marginTop: '145px'}}>
                    <div className={styles.personal_left}>
                        <ExpertWelcome actions={actions}/>
                        <div className={styles.personal_nav}>
                            <ul>
                                <li><NavLink to="/PersonalCenterExpert/basicInfo">个人信息</NavLink></li>
                                <li><NavLink to="/PersonalCenterExpert/myUsers">我的用户</NavLink></li>
                                <li><NavLink to="/PersonalCenterExpert/quesList">问题列表</NavLink></li>
                                <li><NavLink to="/PersonalCenterExpert/myMessage">我的消息</NavLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.personal_right}>
                        {this.props.children}
                    </div>
                </div>
                <CommonFooterComponent />
            </div>
        )
    }
}
export default PersonalCenterExpert;