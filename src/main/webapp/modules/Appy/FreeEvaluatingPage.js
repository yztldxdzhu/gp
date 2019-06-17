import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import FreeEvaluatingInfo from './FreeEvaluatingInfo';

class EvaluatingComponent extends Component{
    render(){
        return (
            <div style={{minWidth: '860px', paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <FreeEvaluatingInfo actions={actions}/>
                <CommonFooterComponent />
            </div>
        );
    }
}

export default EvaluatingComponent;