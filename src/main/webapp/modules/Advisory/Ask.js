import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import AskAllTags from './AskAllTags';
import styles from '../../public/styles/user/ask.css';

class Ask extends Component{
    constructor(props){
        super(props);
        this.state = {
            button: '提交',
            isSubmitSuccess: false,
            tagId: '',
            questionContent: ''
        };
        this.chooseTag = this.chooseTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    chooseTag(e){
        this.setState({tagId: e.target.value})
    }
    handleSubmit(){
        let { dispatch, actions } = this.props;
        this.setState({button: '提交中...'});
        let data = {};
        data.tagId = this.state.tagId;
        data.questionContent = this.state.questionContent;
        dispatch(actions.submitQuestion(data, this));
    }
    render(){
        let infoTip = this.state.isSubmitSuccess ? (
                <p>
                    尊敬的客户您好！您的问题已经提交成功，正在进行审核，我们的留学顾问将会尽快解决您的问题！
                    欢迎前往
                    <NavLink to="/personalCenter/myMessage">
                        个人中心页面
                    </NavLink>
                    查看！
                </p>
            ) : (
                <p>
                    尊敬的客户您好！请您填写下方相关信息！便于我们及时和您沟通！
                </p>
            );
        return (
            <div className={styles.ask_body} style={{marginTop: '145px'}}>
                <div className={styles.ask_alert}>
                    {infoTip}
                </div>
                <div className={styles.ask_info}>
                    <form className={styles.ask_form}>
                        <AskAllTags chooseTag={this.chooseTag} actions={actions}/>
                        <textarea
                            onChange={ (e) => {this.setState({questionContent: e.target.value})} }
                            className={styles.ask_desc}
                            name="description"
                            defaultValue="请输入您的问题描述" />
                        <input
                            onClick={this.handleSubmit}
                            className={styles.ask_btn}
                            type="button"
                            value="提交"/>
                    </form>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(Ask);