import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/myInfo.css';

class MyQues extends Component{
    constructor(props){
        super(props);
        this.state = {
            userQuestionList: []
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getUserQues(this));
    }
    render(){
        return (
            <div>
                <p className={styles.the_header}>
                    您总共有{this.state.userQuestionList.length}个提问
                </p>

                {this.state.userQuestionList.map((ques, i) => {
                    let quesStatusDOM;
                    if(ques.questionIspassed == 0){
                        quesStatusDOM = <div className={styles.reply_ofthe_ques}>您的问题正在审核...</div>
                    }else if(ques.questionIspassed == 2){
                        quesStatusDOM = <div className={styles.reply_ofthe_ques}>您的问题未通过审核</div>
                    }else if(ques.questionIspassed == 1){
                        quesStatusDOM = (
                            <div className={styles.reply_ofthe_ques}>
                                {ques.replyList.length == 0 || ques.replyList == null ? (
                                        <p>暂无回复</p>
                                    ) : (
                                        ques.replyList.map((reply, i) => {
                                            return(
                                                <p key={i}>回复{i+1 + '： ' + reply.replyContent}</p>
                                            )
                                        })
                                    )}
                            </div>
                        );
                    }
                    return(
                        <div className={styles.ques_each} key={i}>
                            <p style={{cursor: 'pointer'}}>问： {ques.questionContent}</p>
                            {quesStatusDOM}
                        </div>
                    )
                })}

                {/*<div className={styles.ques_each}>
                    <p>管理员你们的网站太垃圾了吧！</p>
                </div>

                <div className={styles.ques_each}>
                    <p>哪种情况下可以澳大利亚签证加急预约？</p>
                </div>

                <div className={styles.ques_each}>
                    <p>同学，您大学绩点多少？</p>
                </div>*/}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyQues);