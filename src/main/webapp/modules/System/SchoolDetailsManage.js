import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import SchoolDetails from './SchoolDetails';
import styles from '../../public/styles/system/manage.css';

class SchoolDetailsManage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <SchoolDetails  actions={actions} universityId={this.props.location.state.universityId}/>
            </div>
        )
    }
}
export default SchoolDetailsManage;