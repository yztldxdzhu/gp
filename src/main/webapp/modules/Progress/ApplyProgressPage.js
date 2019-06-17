import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import ApplyProgress from './ApplyProgress';

class ApplyProgressPage extends Component{
    render(){
        let applicationId = this.props.location.state.applicationId;
        let applicationCampus = this.props.location.state.applicationCampus;
        let scheduleStatus = this.props.location.state.scheduleStatus;
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <ApplyProgress actions={actions} applicationId={applicationId} applicationCampus={applicationCampus} scheduleStatus={scheduleStatus}/>
                <CommonFooterComponent />
            </div>
        )
    }
}
export default ApplyProgressPage;