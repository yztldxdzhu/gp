import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import GoodsDetail from './GoodsDetail';

class GoodsComponent extends Component{
    render(){
        let goodsId = this.props.location.state.goodsId;
        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <GoodsDetail actions={actions} goodsId={goodsId}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default GoodsComponent;