import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class ExpertInfoUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            userList: []
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestUsersOfExpert(this));
    }
    render(){
        return (
            <div>
                <p className={styles.the_header}>我的用户</p>
                <div className={styles.users_all}>
                    {this.state.userList.length == 0 ? (
                        <div style={{textAlign: "center"}}>您暂时没有用户！</div>
                        ) : (
                            this.state.userList.map((user, i) => {
                                return(
                                    <div className={styles.users_each} key={i}>
                                        <h3>{user.userName}</h3>
                                        {user.applicationList == null ? (
                                            <div style={{textAlign: "center"}}>该用户还没有申请！</div>
                                            ) : (
                                                user.applicationList.map((apply, j) => {
                                                    return(
                                                        <ul className={styles.users_applys_each} key={j}>
                                                            <li>{apply.applicationCampus}</li>
                                                            <li>{apply.applicationMajor}</li>
                                                            <li>{apply.schedule.scheduleStatus}</li>
                                                        </ul>
                                                    )
                                                })
                                            )}
                                    </div>
                                )
                            })
                        )}
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertInfoUsers);