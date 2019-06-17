import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class ExpertInfos extends Component{
    constructor(props){
        super(props);
        this.state = {
            passExpertList: [],
            noPassExpertList: []
        };
        this.expertClick = this.expertClick.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllExpertsSys(this));
    }
    expertClick(e){
        this.context.router.push({
            pathname: '/expertManage/expertCheck',
            query: { expertId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>顾问管理</p>
                <div className={styles.the_each_head}>
                    <ul>
                        <li>姓名</li>
                        <li>电话</li>
                        <li>学历</li>
                        <li>专业</li>
                    </ul>
                </div>
                {this.state.noPassExpertList.map((expert, i) => {
                    return (
                        <div onClick={this.expertClick} className={styles.the_each} key={i} id={expert.expertId}>
                            <ul id={expert.expertId}>
                                <li id={expert.expertId}>
                                    <span id={expert.expertId} className={styles.expert_status}>
                                        {expert.expertStatus == 0 ? '未审核' : '通过审核'}
                                    </span>
                                    {expert.expertName}
                                </li>
                                <li id={expert.expertId}>{expert.expertTel}</li>
                                <li id={expert.expertId}>{expert.expertEducation}</li>
                                <li id={expert.expertId}>{expert.expertMajor}</li>
                            </ul>
                        </div>
                    )
                })}
                {this.state.passExpertList.map((expert, i) => {
                    return (
                        <div onClick={this.expertClick} className={styles.the_each} key={i} id={expert.expertId}>
                            <ul id={expert.expertId}>
                                <li id={expert.expertId}>
                                    <span id={expert.expertId} className={styles.expert_status}>
                                        {expert.expertStatus == 0 ? '未审核' : '通过审核'}
                                    </span>
                                    {expert.expertName}
                                </li>
                                <li id={expert.expertId}>{expert.expertTel}</li>
                                <li id={expert.expertId}>{expert.expertEducation}</li>
                                <li id={expert.expertId}>{expert.expertMajor}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}
ExpertInfos.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertInfos);