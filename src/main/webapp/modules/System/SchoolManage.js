import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import SchoolInfos from './SchoolInfos';
import styles from '../../public/styles/system/manage.css';

class SchoolManage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <SchoolInfos  actions={actions}/>
            </div>
        )
    }
}
export default SchoolManage;