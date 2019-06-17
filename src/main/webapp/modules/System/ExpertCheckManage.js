import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import ExpertCheckInfo from './ExpertCheckInfo';
import styles from '../../public/styles/system/manage.css';

class ExpertCheckManage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let expertId = this.props.location.query.expertId;
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <ExpertCheckInfo actions={actions} expertId={expertId}/>
            </div>
        )
    }
}
export default ExpertCheckManage;