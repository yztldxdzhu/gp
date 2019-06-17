import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import CollegeDetail from './CollegeDetail';

class CollegePage extends Component{
    render(){
        let universityId = this.props.location.state.universityId;
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <CollegeDetail actions={actions} universityId={universityId}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default CollegePage;