import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class MyApply extends Component{
    constructor(props){
        super(props);
        this.state = {
            userApplicationList: []
        };
        this.applyClick = this.applyClick.bind(this);
        this.deleteApply = this.deleteApply.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestUserApplication(this));
    }
    applyClick(e){
        this.context.router.push({
            pathname: '/myProgress',
            state: {
                applicationId: e.target.getAttribute('value'),
                scheduleStatus: e.target.id,
                applicationCampus: e.target.getAttribute('data')
            }
        });
    }
    deleteApply(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.applicationId = e.target.id;
        dispatch(actions.deleteUserApplication(data, this));
    }
    render(){
        return (
            <div>
                {this.state.userApplicationList == null ? (
                        <p className={styles.the_header}>您还没有申请，请前去<NavLink to="/apply">申请</NavLink></p>
                    ) : (
                        <p className={styles.the_header}>您有{this.state.userApplicationList.length}个申请</p>
                    )}

                {this.state.userApplicationList.map((apply,i) => {
                    let applyStatusDOM;
                    if(apply.isPassed == 0){
                        applyStatusDOM = <span style={{pointerEvents: 'none', cursor: 'default', opacity: 0.8}}>申请表未审核，请耐心等待...</span>
                    }else if(apply.isPassed == 2){
                        applyStatusDOM = <span style={{pointerEvents: 'none', cursor: 'default', opacity: 0.5}}>申请表未通过，请重新申请</span>
                    }else if(apply.isPassed == 1){
                        applyStatusDOM = <span onClick={this.applyClick} value={apply.applicationId} id={apply.schedule.scheduleStatus} data={apply.applicationCampus}>申请表通过审核，点击继续下一步</span>
                    }
                    return (
                        <div className={styles.apply_each} key={i}>
                            <p><span>申请目标：</span>{apply.applicationTarget}</p>
                            <p><span>申请学校：</span>{apply.applicationCampus}</p>
                            <p><span>申请学院：</span>{apply.applicationCollege}</p>
                            <p><span>申请专业：</span>{apply.applicationMajor}</p>
                            <p className={styles.apply_progress}>
                                <span>申请进度：</span>
                                {applyStatusDOM}
                            </p>
                            <div className={styles.delete_application}>
                                <form>
                                    <button type="button" id={apply.applicationId} onClick={this.deleteApply}>删除该申请</button>
                                </form>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
MyApply.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyApply);