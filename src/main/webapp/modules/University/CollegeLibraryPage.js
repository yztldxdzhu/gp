import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import Colleges from './Colleges';

class CollegeLibraryComponent extends Component{
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <Colleges actions={actions}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default CollegeLibraryComponent;