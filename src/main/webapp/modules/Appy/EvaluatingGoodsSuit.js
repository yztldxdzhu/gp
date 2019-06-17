import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/apply.css';
import mallGoods from '../../public/images/goods.jpg';

class EvaluatingGoodsSuit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recommend: '您适合这些产品',
            goodsList: [],
            loading: '加载中...'
        };
        this.getGoodsById = this.getGoodsById.bind(this);
        this.addToCar = this.addToCar.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        // dispatch(actions.findGoodsEvaluate(this));
        dispatch(actions.getAllGoods(this));
    }
    getGoodsById(e){
        this.context.router.push({
            pathname: '/studyMall/goods',
            state: { goodsId: e.target.id }
        });
    }
    addToCar(e){
        let { dispatch, actions, state } = this.props;
        if(state.LoginReducers.success){
            let data = {};
            data.goodsId = e.target.id;
            data.shoppingcartBuycount = 1;
            dispatch(actions.addToCart(data, this));
        }else{
            alert('请登录！');
        }
    }
    render(){
        return (
            <div className={styles.product_suit}>
                <NavLink to="/studyMall">
                    <small>展示更多产品</small>
                </NavLink>
                <h3 className={styles.product_suit_title}>您适合这些产品</h3>
                <div className={styles.product_suit_some}>
                    {this.state.goodsList.slice(0, 4).map((goods, i) => {
                        return(
                            <div className={styles.product_suit_each} key={i}>
                                <p id={goods.goodsId} onClick={this.getGoodsById}>
                                    <img id={goods.goodsId} src={'/gp/' + goods.goodsPicture} alt={goods.goodsName}/>
                                </p>
                                <div className={styles.product_suit_each_desc}>
                                    <p className={styles.product_suit_each_name}>{goods.goodsName}</p>
                                    <p className={styles.price}>
                                        <span className={styles.new_price}>￥{goods.goodsPrice}.00</span>
                                        <span className={styles.old_price}>¥12000.00</span>
                                    </p>
                                    <p className={styles.add_to_car} id={goods.goodsId} onClick={this.addToCar}>加入购物车</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
EvaluatingGoodsSuit.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return {state: state}
};
export default connect(mapStateToProps)(EvaluatingGoodsSuit);