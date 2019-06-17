import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';
import cart from '../../public/images/cart.jpg';

class MyCar extends Component{
    constructor(props){
        super(props);
        this.state = {
            shoppingCartList: [],

            shoppingCarts: [],
            status: 'all_goods',
            checked: false,
        };
        this.deleteShoppingByCartId = this.deleteShoppingByCartId.bind(this);
        this.selectGoods = this.selectGoods.bind(this);//选中多个checkbox
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getUserCar(this));
    }
    deleteShoppingByCartId(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.shoppingcartId = e.target.id;
        dispatch(actions.deleteShoppingByCartId(data, this));
    }
    selectGoods(e){
        let shoppingcartId = e.target.id;
        let shoppingCarts = this.state.shoppingCarts;
        let index = shoppingCarts.indexOf(shoppingcartId);
        if(index == -1){//不存在就添加
            shoppingCarts.push(shoppingcartId);
        }else{//存在就删除
            shoppingCarts.splice(index, 1);
        }
        this.setState({shoppingCarts: shoppingCarts});

        if(this.state.shoppingCarts.length == 0){
            this.setState({checked: false});
        }else{
            this.setState({checked: true});
        }
    }
    render(){
        return (
            <div>
                <p className={styles.the_header}>我的购物车</p>
                {this.state.shoppingCartList.length == 0 || this.state.shoppingCartList == null ? (
                        <div className={styles.cart_null}>
                            <h3>您的购物车空空如也！去<NavLink to="/studyMall">商城</NavLink>逛逛</h3>
                            <img src={cart} alt="空的购物车" title="您的购物车空空如也！"/>
                        </div>
                    ) : (
                        <div>
                            <ul className={styles.show_condi}>
                                <li
                                    id="all_goods"
                                    onClick={(e) => {this.setState({status: e.target.id})}}
                                    style={{backgroundColor: this.state.status == 'all_goods' ? '#a22020' : '#ffffff'}}>全部商品</li>
                                <li
                                    id="discount_goods"
                                    onClick={(e) => {this.setState({status: e.target.id})}}
                                    style={{backgroundColor: this.state.status == 'discount_goods' ? '#a22020' : '#ffffff'}}>折扣商品</li>
                            </ul>
                            <div style={{display: this.state.status == "all_goods" ? 'block' : 'none'}}>
                                <ul className={styles.goods_header}>
                                    <li>商品</li>
                                    <li>商品单价</li>
                                    <li>商品数量</li>
                                    <li>商品总价</li>
                                    <li>操作</li>
                                </ul>
                                {this.state.shoppingCartList.map((shoppingCart, i)=>{
                                    let goods = shoppingCart.goods;
                                    return(
                                        <ul className={styles.goods_each} key={i}>
                                            <li className={styles.goods_each_img}>
                                                <input
                                                    type="checkbox"
                                                    id={shoppingCart.shoppingcartId}
                                                    onClick={this.selectGoods}
                                                />
                                                <img src={'/gp/' + goods.goodsPicture} alt={goods.goodsName} width={50} height={50}/>
                                                <span>{goods.goodsName}</span>
                                            </li>
                                            <li>{goods.goodsPrice}</li>
                                            <li>
                                                <ul className={styles.row_four}>
                                                    <li className={styles.text_count}>数量</li>
                                                    <li className={styles.sub_btn} id={shoppingCart.shoppingcartId} onClick={(e) => {
                                                        if(shoppingCart.shoppingcartBuycount == 1){
                                                            alert('不能再减了！');
                                                        }else{
                                                            let { dispatch, actions } = this.props;
                                                            let data = {};
                                                            data.shoppingCartId = e.target.id;
                                                            data.goodsCount = shoppingCart.shoppingcartBuycount - 1;
                                                            dispatch(actions.ModifyShoppingCartGoodsCount(data, this));
                                                        }
                                                    }}>-</li>
                                                    <input className={styles.input_count} type="text" value={shoppingCart.shoppingcartBuycount} onChange={(e) => {

                                                        console.log(e.target.value);

                                                    }}/>
                                                    <li className={styles.add_btn} id={shoppingCart.shoppingcartId} onClick={(e) => {
                                                        let { dispatch, actions } = this.props;
                                                        let data = {};
                                                        data.shoppingCartId = e.target.id;
                                                        data.goodsCount = shoppingCart.shoppingcartBuycount + 1;
                                                        dispatch(actions.ModifyShoppingCartGoodsCount(data, this));
                                                    }}>+</li>
                                                    <li className={styles.stock_num}>件(库存{goods.goodsStock-shoppingCart.shoppingcartBuycount}件)</li>
                                                </ul>
                                            </li>
                                            <li>{goods.goodsPrice * shoppingCart.shoppingcartBuycount}</li>
                                            <li>
                                                <button type="button" id={shoppingCart.shoppingcartId} onClick={this.deleteShoppingByCartId}>删除</button>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>

                            <div className={styles.cart_op} style={{display: this.state.checked ? 'block' : 'none'}}>
                                <button
                                    className={styles.submit_orders}
                                    onClick={()=>{
                                    this.context.router.push({
                                        pathname: '/studyMall/buy',
                                        state: { shoppingCartIdStr: this.state.shoppingCarts.toString() }
                                    });
                                }}>提交订单</button>

                                <button
                                    className={styles.delete_batch}
                                    onClick={() => {
                                        let { dispatch, actions } = this.props;

                                }}>删除所选</button>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}
MyCar.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyCar);