import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import CaseDetail from './CaseDetail';

class CasePage extends Component{
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <CaseDetail actions={actions}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default CasePage;