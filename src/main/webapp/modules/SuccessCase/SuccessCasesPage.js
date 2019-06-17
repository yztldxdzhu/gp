import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import SuccessCases from './SuccessCases';

class SuccessCasePage extends Component{
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <SuccessCases actions={actions}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default SuccessCasePage;