import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class TagInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagNames: [],
            display: 'none',

            tagContent: '',
            button: '提交'
        };
        this.deleteTag = this.deleteTag.bind(this);
        this.addTag = this.addTag.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllTags(this));
    }
    deleteTag(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.tagId = e.target.id;
        dispatch(actions.deleteTag(data, this));
    }
    addTag(e){
        this.setState({button: '提交中...'});
        let { dispatch, actions } = this.props;
        let tagContent = this.state.tagContent;
        if(tagContent.length > 4){
            e.preventDefault();
            alert('请限制长度！');
            this.setState({button: '提交'});
        }else{
            let data = {};
            data.tagContent = this.state.tagContent;
            dispatch(actions.addTag(data, this));
        }
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>标签管理</p>
                {this.state.tagNames.map( (tag, i) => {
                    return (
                        <div className={styles.the_each_tag} key={i}>
                            <div className={styles.the_each_name}>
                                {tag.tagContent}
                            </div>
                            <form className={styles.delete_tag}>
                                <button type="button" id={tag.tagId} onClick={this.deleteTag}>删除</button>
                            </form>
                        </div>
                    )
                } )}
                <div className={styles.the_each_tag_last} onClick={ () => {this.setState({display: 'block'})} }>
                    <div className={styles.the_each_name_last}>+</div>
                </div>
                <form style={{display: this.state.display}} className={styles.add_tag_form}>
                    <input
                        onChange={ (e) => {this.setState({ tagContent: e.target.value })} }
                        className={styles.add_tag_input}
                        type="text"
                        placeholder="请输入标签的名字"
                    />
                    <button type="button" className={styles.add_tag_btn} onClick={this.addTag}>{this.state.button}</button>
                </form>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(TagInfos);