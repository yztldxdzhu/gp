import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import ApplyInfos from './ApplyInfos';
import styles from '../../public/styles/system/manage.css';

class ApplyManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <ApplyInfos actions={actions}/>
            </div>
        )
    }
}
export default ApplyManage;