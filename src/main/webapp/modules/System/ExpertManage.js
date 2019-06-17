import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import ExpertInfos from './ExpertInfos';
import styles from '../../public/styles/system/manage.css';

class ExpertManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <ExpertInfos actions={actions}/>
            </div>
        )
    }
}
export default ExpertManage;