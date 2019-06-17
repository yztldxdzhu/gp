import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import QuesInfos from './QuesInfos';
import styles from '../../public/styles/system/manage.css';

class QuesManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <QuesInfos actions={actions}/>
            </div>
        )
    }
}
export default QuesManage;