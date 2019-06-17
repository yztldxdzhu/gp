import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import ExpertInfoReply from './ExpertInfoReply';
import styles from '../../public/styles/user/myInfo.css';

class ExpertInfoQuesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            display: 'none',
            quesId: 0
        };
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllQuestions(this));
    }
    render(){
        return (
            <div>
                <p className={styles.the_header}>问题列表</p>
                <div className={styles.ques_all}>
                    {this.state.questions.map((ques, i) => {
                        return(
                            <div className={styles.ques_list_each} key={i}>
                                <div className={styles.ques_show}>
                                    <p>{ques.questionContent}</p>
                                    <span>by{ques.questionUser.userName}</span>
                                    <button id={ques.questionId} onClick={(e) => {this.setState({display: 'block', quesId: e.target.id})}}>回复</button>
                                </div>
                                {ques.replyList == null ? (
                                        <div className={styles.reply_show}>暂无回复！</div>
                                    ) : (
                                        ques.replyList.map((reply, i) => {
                                            return (
                                                <div className={styles.reply_show} key={i}>
                                                   <p>回复{ (i+1) + "：" + reply.replyContent}</p>
                                                </div>
                                            )
                                        })
                                    )}
                                <ExpertInfoReply id={ques.questionId} data={this.state.quesId} display={this.state.display} actions={actions}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertInfoQuesList);