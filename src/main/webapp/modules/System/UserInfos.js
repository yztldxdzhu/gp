import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class UserInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllUsers(this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>用户管理</p>
                <div className={styles.the_each_head}>
                    <ul>
                        <li>姓名</li>
                        <li>电话</li>
                        <li>学历</li>
                        <li>学校</li>
                    </ul>
                </div>
                {this.state.users.map((user, i) => {
                    return (
                        <div className={styles.the_each} key={i}>
                            <ul>
                                <li>{user.userName ? user.userName : '无'}</li>
                                <li>{user.userTel ? user.userTel : '无'}</li>
                                <li>{user.userEducation ? user.userEducation : '无'}</li>
                                <li>{user.userCampus ? user.userCampus : '无'}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(UserInfos);