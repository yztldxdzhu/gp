import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/home.css';

class NewQuestions extends Component{
    constructor(props){
        super(props);
        this.state = {
            passedQuestionList: []
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllPassedQues(this));
    }
    render(){
        return (
            <div className={styles.questions}>
                <NavLink to="/advisories">
                    <small className={styles.questions_more}>更多</small>
                </NavLink>
                <h3 className={styles.questions_title}>最新提问</h3>
                <div className={styles.questions_some}>
                    {this.state.passedQuestionList.slice(0, 5).map((ques, i) => {
                        return (
                            <div className={styles.questions_some_each} key={i}>
                                <p>{ques.questionContent}</p>
                                <span>by {ques.questionUser.userName}</span>
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
export default connect(mapStateToProps)(NewQuestions);