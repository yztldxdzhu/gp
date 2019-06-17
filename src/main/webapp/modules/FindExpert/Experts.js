import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import ExpertsAllTags from './ExpertsAllTags';
import styles from '../../public/styles/user/experts.css';
import expertPic from '../../public/images/expert.jpg';

class Experts extends Component{
    constructor(props){
        super(props);
        this.state = {
            experts: []
        };
        this.tagClick = this.tagClick.bind(this);
        this.expertClick = this.expertClick.bind(this);
    }
    tagClick(e){
        let { dispatch, actions } = this.props;
        let tagContent = e.target.getAttribute('content');
        let tagId = e.target.id;
        this.setState({whichTag: tagContent});
        let data = {};
        data.tagId = tagId;
        if(tagId == '0'){
            dispatch(actions.getAllExperts(this));
        }else{
            dispatch(actions.getAllExpertsByTag(data, this));
        }
    }
    expertClick(e){
        this.context.router.push({
            pathname: '/experts/expert',
            query: { expertId: e.target.id }
        });
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllExperts(this));
    }
    render(){
        let { state } = this.props;
        let canLink = (state.LoginReducers.userType == 0);//只有普通用户才能点击查看顾问
        let expertsDom;
        if(this.state.experts.length == 0){
            expertsDom = (
                <div className={styles.category_each}>暂时没有{this.state.whichTag}的顾问</div>
            )
        }else{
            expertsDom = this.state.experts.map( (expert, i) => {
                return (
                    <div className={styles.expert_each} key={i}>
                        <p onClick={ this.expertClick } id={expert.expertId}>
                            <img src={'/gp/' + expert.expertHeadPicture} alt={expert.expertName} id={expert.expertId}/>
                        </p>
                        <div className={styles.expert_each_desc}>
                            <p className={styles.expert_name}>{expert.expertName ? expert.expertName : '无'}</p>
                            <p className={styles.expert_tag}>
                                {expert.tagList == null || expert.tagList == [] ?
                                    '无标签' :
                                    expert.tagList.map( (tag) => {
                                        return tag.tagContent + ','
                                    })
                                }
                            </p>
                            <p className={styles.expert_locate}>{expert.expertLocation ? expert.expertLocation : '无 '}</p>
                        </div>
                    </div>
                )
            } )
        }
        return (
            <div className={styles.category} style={{marginTop: '145px'}}>
                <div className={styles.category_each}>
                    <span>标签</span>
                    <ExpertsAllTags tagClick={this.tagClick} actions={actions}/>
                </div>
                {expertsDom}
            </div>
        );
    }
}
Experts.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(Experts);