import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import AdvisoryAllTags from './AdvisoryAllTags';
import styles from '../../public/styles/user/advisory.css';

class Advisories extends Component{
    constructor(props){
        super(props);
        this.state = {
            passedQuestionList: [],
            whichTag: '最新问答'
        };
        this.tagClick = this.tagClick.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllPassedQues(this));
    }
    tagClick(e){
        let { dispatch, actions } = this.props;
        let tagContent = e.target.getAttribute('content');
        let tagId = e.target.id;
        this.setState({whichTag: tagContent});
        let data = {};
        data.tagId = tagId;
        if(tagId == '0'){
            dispatch(actions.getAllPassedQues(this));
        }else{
            dispatch(actions.getAllQuestionsByTag(data, this));
        }
    }
    render(){
        let { state } = this.props;
        let canAsk = state.LoginReducers.success ? (
                <span className={styles.me_ask}>
                    <NavLink to="/advisories/ask">
                        我要提问
                    </NavLink>
                </span>
            ) : (
                <span className={styles.me_ask} onClick={() => {alert('请登录后再进行操作!')}} style={{cursor: 'pointer'}}>
                    我要提问
                </span>
            );
        return (
            <div className={styles.category} style={{marginTop: '145px'}}>
                <div className={styles.category_each_last}>
                    <span>热门标签：</span>
                    <AdvisoryAllTags tagClick={this.tagClick} actions={actions}/>
                </div>

                <div className={styles.banner_ask}>
                    <span className={styles.new_ques}>{this.state.whichTag}</span>
                    {canAsk}
                </div>

                <div className={styles.all_ques}>
                    {this.state.passedQuestionList.map( (question,i) => {
                        if(question.replyList == null){
                            question.replyList = [];
                        }
                        return (
                            <div className={styles.ques_each} key={i}>
                                <div className={styles.ques_ask}>
                                    <p><span>{question.questionUser.userName}</span>发表于：<span>{question.questionTime}</span></p>
                                    <p className={styles.ask_detail}>
                                        {question.questionContent}
                                    </p>
                                </div>
                                {question.replyList.map( (reply, i) => {
                                    return(
                                        <div className={styles.ques_reply} key={i}>
                                            <p><span>{reply.replyExpert.expertName}</span>回复于：<span>{reply.replyTime}</span></p>
                                            <p className={styles.reply_detail}>
                                                {reply.replyContent}
                                            </p>
                                        </div>
                                    )
                                } )}
                            </div>
                        )} )}
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(Advisories);