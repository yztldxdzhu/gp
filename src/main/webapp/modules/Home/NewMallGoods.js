import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/home.css';

class NewMallGoods extends Component{
    constructor(props){
        super(props);
        this.state = {
            goodsList: [],
            loading: '加载中...'
        };
        this.addToCar = this.addToCar.bind(this);
        this.getGoodsById = this.getGoodsById.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllGoods(this));
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
    getGoodsById(e){
        this.context.router.push({
            pathname: '/studyMall/goods',
            state: { goodsId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.mall_goods}>
                <NavLink to="/studyMall">
                    <small>展示更多产品</small>
                </NavLink>

                <h3 className={styles.mall_goods_title}>最新商城产品展示</h3>

                <div className={styles.mall_goods_some}>

                    {this.state.goodsList.length == 0 || this.state.goodsList == null ? (
                            <div className={styles.goods_no}>
                                {this.state.loading}
                            </div>
                        ) : (
                            this.state.goodsList.slice(0,5).map((goods, i)=>{
                                return(
                                    <div className={styles.mall_goods_each} key={i}>
                                        <p id={goods.goodsId} onClick={this.getGoodsById}>
                                            <img id={goods.goodsId} src={'/gp/' + goods.goodsPicture} alt={goods.goodsName}/>
                                        </p>
                                        <div className={styles.mall_goods_each_desc}>
                                            <p className={styles.mall_goods_each_name}>{goods.goodsName}</p>
                                            <p className={styles.price}>
                                                <span className={styles.new_price}>￥{goods.goodsPrice}.00</span>
                                                <span className={styles.old_price}>¥12000.00</span>
                                            </p>
                                            <p className={styles.add_to_car} id={goods.goodsId} onClick={this.addToCar}>加入购物车</p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                </div>
            </div>
        )
    }
}
NewMallGoods.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(NewMallGoods);