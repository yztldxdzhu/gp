import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/ask.css';

class AskAllTags extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagNames: []
        }
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllTags(this));
    }
    render(){
        let tagNames = this.state.tagNames;
        let optionDom = tagNames.map( (tag,i) => {
            return (
                <option key={i} value={tag.tagId}>{tag.tagContent}</option>
            )
        } );
        return (
            <select
                onChange={this.props.chooseTag}
                name="tag"
                id="tag"
                className={styles.ask_select}
            >
                <option value="">请为您的提问选择合适的标签</option>
                {optionDom}
            </select>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(AskAllTags);