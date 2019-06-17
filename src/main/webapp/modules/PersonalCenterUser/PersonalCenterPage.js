import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import UserWelcome from './UserWelcome';
import styles from '../../public/styles/user/personalCenter.css';

class PersonalCenterPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <div className={styles.personal_content} style={{marginTop: '145px'}}>
                    <div className={styles.personal_left}>
                        <UserWelcome actions={actions}/>
                        <div className={styles.personal_nav}>
                            <ul>
                                <li><NavLink to="/personalCenter/basicInfo">个人信息</NavLink></li>
                                <li><NavLink to="/personalCenter/myApply">我的申请</NavLink></li>
                                <li><NavLink to="/personalCenter/myExpert">我的顾问</NavLink></li>
                                <li><NavLink to="/personalCenter/myQuestion">我的提问</NavLink></li>
                                <li><NavLink to="/personalCenter/myMessage">我的消息</NavLink></li>
                                <li><NavLink to="/personalCenter/myOrder">我的订单</NavLink></li>
                                <li><NavLink to="/personalCenter/myCar">我的购物车</NavLink></li>
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
export default PersonalCenterPage;