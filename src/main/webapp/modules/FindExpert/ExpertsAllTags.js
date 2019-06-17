import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';

class ExpertsAllTags extends React.Component{
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
        let liDom = tagNames.map( (tag,i) => {
            return (
                <li key={i} content={tag.tagContent} id={tag.tagId}>{tag.tagContent}</li>
            )
        } );
        return (
            <ul onClick={this.props.tagClick}>
                <li content="全部" id="0">全部</li>
                {liDom}
            </ul>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertsAllTags);