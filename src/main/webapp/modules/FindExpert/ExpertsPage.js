import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import Experts from './Experts';

class ExpertsPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />

                <Experts actions={actions}/>

                <CommonFooterComponent />
            </div>
        );
    }
}
export default ExpertsPage;