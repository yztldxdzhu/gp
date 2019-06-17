import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import styles from '../../public/styles/user/commonComponent.css';

class FileUpload extends Component{
    render(){
        return (
            <span className={styles.select_file}>
                <span>{this.props.content ? this.props.content : "选择文件"}</span>
                <input type="file" onChange={this.props.change}/>
            </span>
        )
    }
}

class Star extends React.Component{
    render(){
        return (
            <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
        )
    }
}



export { FileUpload, Star };
