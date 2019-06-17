import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/myInfo.css';

class ExpertInfoReply extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            replyContent: '',
            button: '提交'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        this.setState({button: '提交中...'});
        let { dispatch, actions } = this.props;
        let data = {};
        data.questionId = this.props.id;
        data.replyContent = this.state.replyContent;
        console.log(data);
        dispatch(actions.addReply(data, this, e));
    }
    render(){
        if(this.props.data != 0 && this.props.data == this.props.id){
            return(
                <form style={{display: this.props.display}} className={styles.reply_form}>
                <textarea
                    onChange={ (e) => {this.setState({replyContent: e.target.value})} }
                    className={styles.reply_content}
                    name="rely"
                    defaultValue="请输入您的回复"/>
                    <button
                        className={styles.reply_btn}
                        onClick={this.handleSubmit}>
                        {this.state.button}
                    </button>
                </form>
            )
        }else{
            return(
                <span></span>
            )
        }
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertInfoReply);