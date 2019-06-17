import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import UserInfos from './UserInfos';
import styles from '../../public/styles/system/manage.css';

class UserManage extends Component{
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <UserInfos actions={actions}/>
            </div>
        )
    }
}
export default UserManage;