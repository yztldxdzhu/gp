import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import ImageBanner from './ImageBanner';
import NewSuccessCase from './NewSuccessCase';
import NewQuestions from './NewQuestions';
import NewMallGoods from './NewMallGoods';
import CollegeSort from './CollegeSort';

class HomeComponent extends Component{
    render(){
        return (
            <div style={{minWidth:'860px'}}>
                <CommonHeaderComponent />

                <ImageBanner />
                <NewSuccessCase />
                <NewQuestions actions={actions}/>
                <NewMallGoods actions={actions}/>
                <CollegeSort actions={actions}/>

                <CommonFooterComponent />
            </div>
        );
    }
}
export default HomeComponent;