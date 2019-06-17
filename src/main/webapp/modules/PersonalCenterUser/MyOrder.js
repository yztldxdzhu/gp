import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';
import house from '../../public/images/house.png';

class MyOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderList: [],
            status: 'all_orders',
        };
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getUserOrder(this));
    }
    render(){
        return (
            <div>
                <p className={styles.the_header}>我的订单</p>
                {this.state.orderList.length == 0 || this.state.orderList == null ? (
                        <div className={styles.cart_null}>
                            <h3>暂无数据！去<NavLink to="/studyMall">商城</NavLink>逛逛</h3>
                            <img src={house} alt="空的订单" title="您还没有订单！" width={160} height={160}/>
                        </div>
                    ): (
                        <div>
                            <ul className={styles.show_condi}>
                                <li
                                    id="all_orders"
                                    onClick={(e) => {
                                        this.setState({status: e.target.id});
                                        let { dispatch, actions } = this.props;
                                        dispatch(actions.getUserOrder(this));
                                    }}
                                    style={{backgroundColor: this.state.status == 'all_orders' ? '#a22020' : '#ffffff'}}>全部订单</li>


                                <li
                                    id="pending_payment"
                                    onClick={(e) => {
                                        this.setState({status: e.target.id});
                                        let { dispatch, actions } = this.props;
                                        let data = {};
                                        data.status = 1;
                                        dispatch(actions.findUserOrderByStatus(data, this));
                                    }}
                                    style={{backgroundColor: this.state.status == 'pending_payment' ? '#a22020' : '#ffffff'}}>待付款</li>


                                <li
                                    id="to_be_delivered"
                                    onClick={(e) => {
                                        this.setState({status: e.target.id});
                                        let { dispatch, actions } = this.props;
                                        let data = {};
                                        data.status = 2;
                                        dispatch(actions.findUserOrderByStatus(data, this));
                                    }}
                                    style={{backgroundColor: this.state.status == 'to_be_delivered' ? '#a22020' : '#ffffff'}}>待发货</li>
                                <li
                                    id="to_be_received"
                                    onClick={(e) => {
                                        this.setState({status: e.target.id});
                                        let { dispatch, actions } = this.props;
                                        let data = {};
                                        data.status = 3;
                                        dispatch(actions.findUserOrderByStatus(data, this));
                                    }}
                                    style={{backgroundColor: this.state.status == 'to_be_received' ? '#a22020' : '#ffffff'}}>待收货</li>


                                <li
                                    id="to_be_evaluated"
                                    onClick={(e) => {
                                        this.setState({status: e.target.id});
                                        let { dispatch, actions } = this.props;
                                        let data = {};
                                        data.status = 4;
                                        dispatch(actions.findUserOrderByStatus(data, this));
                                    }}
                                    style={{backgroundColor: this.state.status == 'to_be_evaluated' ? '#a22020' : '#ffffff'}}>待评价</li>

                            </ul>

                            {this.state.orderList.map((order, i)=>{
                                let orderitemList = order.orderitemList;
                                return(
                                    <div className={styles.order_each} key={i}>
                                        <p className={styles.order_number}>
                                            订单编号 {order.ordersNumber}
                                            <button id={order.orderId} className={styles.delete_order}>取消订单</button>
                                        </p>
                                        {orderitemList.map((orderitem, i) => {
                                            let goods = orderitem.goods;
                                            let orderItemStatus = orderitem.orderitemStatus;
                                            let oprationDOM;
                                            if(orderItemStatus == 1) {
                                                orderItemStatus = '未付款';
                                                oprationDOM = (
                                                    <li>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="取消"
                                                            onClick={(e) => {
                                                                let { dispatch, actions } = this.props;
                                                                let data = {};
                                                                data.orderitemId = e.target.id;
                                                                dispatch(actions.cancelOrderItem(data, this));
                                                            }}>
                                                            取消
                                                        </button>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="去付款"
                                                            onClick={(e) => {
                                                                let { dispatch, actions } = this.props;
                                                                let data = {};
                                                                data.orderitemId = e.target.id;
                                                                alert('跳到付款页面！');
                                                            }}>
                                                            去付款
                                                        </button>
                                                    </li>
                                                );
                                            }else if(orderItemStatus == 2){
                                                orderItemStatus = '已付款但未发货';
                                                oprationDOM = (
                                                    <li>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="催促发货"
                                                            onClick={(e) => {
                                                                alert('催促发货！');
                                                            }}>
                                                            催促发货
                                                        </button>
                                                    </li>
                                                );
                                            }else if(orderItemStatus == 3){
                                                orderItemStatus = '已发货未确认收货';
                                                oprationDOM = (
                                                    <li>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="确认收货"
                                                            onClick={(e) => {
                                                                let { dispatch, actions } = this.props;
                                                                let data = {};
                                                                data.orderitemId = e.target.id;
                                                                dispatch(actions.confirmOrderItem(data, this));
                                                            }}>
                                                            确认收货
                                                        </button>
                                                    </li>
                                                );
                                            }else if(orderItemStatus == 4){
                                                orderItemStatus = '确认收货交易成功';
                                                oprationDOM = (
                                                    <li>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="评价"
                                                            onClick={(e) => {
                                                                alert('跳到评价页面！');
                                                            }}>
                                                            评价
                                                        </button>
                                                    </li>
                                                );
                                            }else if(orderItemStatus == 5){
                                                orderItemStatus = '已取消';
                                                oprationDOM = (
                                                    <li>
                                                        <button
                                                            className={styles.operation_btn}
                                                            id={orderitem.orderitemId}
                                                            value="删除"
                                                            onClick={(e) => {
                                                                alert('删除已经取消的订单！');
                                                            }}>
                                                            删除
                                                        </button>
                                                    </li>
                                                );
                                            }
                                            return(
                                                <ul className={styles.orderitem_each} key={i}>
                                                    <li className={styles.goods_each_img}>
                                                        <img src={'/gp/' + goods.goodsPicture} alt={goods.goodsName} width={50} height={50}/>
                                                        <span>{goods.goodsName}</span>
                                                    </li>
                                                    <li>￥{goods.goodsPrice}.00</li>
                                                    <li>{'x' + orderitem.orderitemCount}</li>
                                                    <li>总价:￥{goods.goodsPrice * orderitem.orderitemCount}.00</li>
                                                    <li style={{color: '#a22020'}}>{orderItemStatus}</li>
                                                    {oprationDOM}
                                                </ul>
                                            )
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyOrder);