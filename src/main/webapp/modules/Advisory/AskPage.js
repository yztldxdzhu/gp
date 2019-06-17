import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import Ask from './Ask';

class AskComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />

                <Ask actions={actions}/>

                <CommonFooterComponent />
            </div>
        );
    }
}

export default AskComponent;