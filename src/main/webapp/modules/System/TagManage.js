import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import TagInfos from './TagInfos';
import styles from '../../public/styles/system/manage.css';

class TagManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div className={styles.the_all}>
                    <CommonLeft />
                    <TagInfos actions={actions}/>
                </div>
            </div>
        )
    }
}
export default TagManage;