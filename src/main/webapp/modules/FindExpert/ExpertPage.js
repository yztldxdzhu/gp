import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import ExpertDetail from './ExpertDetail';

class ExpertPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let expertId = this.props.location.query.expertId;
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />

                <ExpertDetail actions={actions} expertId={expertId}/>

                <CommonFooterComponent />
            </div>
        );
    }
}
export default ExpertPage;