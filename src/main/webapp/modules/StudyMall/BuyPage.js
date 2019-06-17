import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import BuyDetail from './BuyDetail';

class BuyPage extends Component{
    render(){
        let goodsId = this.props.location.state.goodsId;
        let goodsBuyCount = this.props.location.state.goodsBuyCount;

        let shoppingCartIdStr = this.props.location.state.shoppingCartIdStr;

        return (
            <div style={{paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <BuyDetail actions={actions} goodsId={goodsId} goodsBuyCount={goodsBuyCount} shoppingCartIdStr={shoppingCartIdStr}/>
                <CommonFooterComponent />
            </div>
        );
    }
}
export default BuyPage;