import React, {Component} from 'react';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class MyMessage extends Component{
    render(){
        return (
            <div>
                <p className={styles.the_header}>您有<span>3</span>条未读消息</p>

                <div className={styles.message_each}>
                    <span>通知消息</span>
                    <p><NavLink to="/personalCenter/msgDetail">恭喜您已经成为我们的注册用户！</NavLink></p>
                </div>

                <div className={styles.message_each}>
                    <span>来自顾问的消息</span>
                    <p><NavLink to="/personalCenter/msgDetail">申请陪读签证的话是不能打工的。</NavLink></p>
                </div>

                <div className={styles.message_each}>
                    <span>来自成功同学的消息</span>
                    <p><NavLink to="/personalCenter/msgDetail">是的！</NavLink></p>
                </div>

            </div>
        )
    }
}
export default MyMessage;