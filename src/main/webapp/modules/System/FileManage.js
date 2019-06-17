import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import FileInfos from './FileInfos';
import styles from '../../public/styles/system/manage.css';

class FileManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <FileInfos actions={actions}/>
            </div>
        )
    }
}
export default FileManage;