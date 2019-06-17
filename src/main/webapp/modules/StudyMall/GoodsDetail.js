import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/goods.css';

class GoodsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            goods: {
                commentList: [],
                scoreList: []
            },
            goodsCount: 1,
        };
    }
    componentDidMount(){
        let { dispatch, actions, goodsId } = this.props;
        let data = {};
        data.goodsId = goodsId;
        dispatch(actions.getGoodsById(data, this));
    }
    render(){
        return (
            <div className={styles.goods_detail} style={{marginTop: '145px'}}>
                <div className={styles.goods_up}>
                    <div className={styles.goods_img}>
                        <img src={'/gp/'+this.state.goods.goodsPicture} alt="商品详情"/>
                    </div>
                    <div className={styles.goods_right}>
                        <h3>{this.state.goods.goodsName}</h3>
                        <ul className={styles.row_one}>
                           <li>
                               <span className={styles.row_one_up}>价格：¥{this.state.goods.goodsPrice}.00</span>
                               <span className={styles.old_price}>原价：¥12000.00</span>
                           </li>
                           <li>
                               <span className={styles.row_one_up}>999</span>
                               <span className={styles.row_one_down}>累计评论</span>
                           </li>
                           <li>
                               <span className={styles.row_one_up}>999</span>
                               <span className={styles.row_one_down}>交易成功</span>
                           </li>
                       </ul>

                        <ul className={styles.row_two}>
                           <li>
                               <span className={styles.goods_top}>服务态度</span>
                               <span className={styles.goods_bottom}>4.9</span>
                           </li>
                           <li>
                               <span className={styles.goods_top}>专业程度</span>
                               <span className={styles.goods_bottom}>4.9</span>
                           </li>
                           <li>
                               <span className={styles.goods_top}>服务时间</span>
                               <span className={styles.goods_bottom}>4.9</span>
                           </li>
                           <li>
                               <span className={styles.goods_top}>综合评分</span>
                               <span className={styles.goods_bottom}>4.9</span>
                           </li>
                       </ul>

                        <ul className={styles.row_four}>
                            <li className={styles.text_count}>数量</li>
                            <li className={styles.sub_btn} onClick={() => {
                                let goodsCount = this.state.goodsCount;
                                if(goodsCount == 1){
                                    alert('不能再减了！');
                                }else{
                                    this.setState({goodsCount: goodsCount-1})
                                }
                            }}>-</li>
                            <input className={styles.input_count} type="text" value={this.state.goodsCount} onChange={(e) => {
                                this.setState({goodsCount: e.target.value});
                            }}/>
                            <li className={styles.add_btn} onClick={() => {
                                let goodsCount = parseInt(this.state.goodsCount);
                                this.setState({goodsCount: goodsCount+1});
                            }}>+</li>
                            <li className={styles.stock_num}>件(库存{parseInt(this.state.goods.goodsStock)-this.state.goodsCount}件)</li>
                        </ul>

                        <ul className={styles.row_three}>
                           <li className={styles.add_to_car} onClick={() => {
                               let { dispatch, actions, state, goodsId } = this.props;
                               if(state.LoginReducers.success){
                                   let data = {};
                                   data.goodsId = goodsId;
                                   data.shoppingcartBuycount = this.state.goodsCount;
                                   dispatch(actions.addToCart(data, this));
                               }else{
                                   alert('请登录!');
                               }
                           }}>加入购物车</li>

                           <li className={styles.buy} onClick={() => {
                               let { state, goodsId } = this.props;
                               if(state.LoginReducers.success){
                                   this.context.router.push({
                                       pathname: '/studyMall/buy',
                                       state: { goodsId: goodsId, goodsBuyCount: this.state.goodsCount }
                                   });
                               }else{
                                   alert('请登录!');
                               }
                           }}>立即购买</li>
                       </ul>

                   </div>
                </div>

                <div className={styles.goods_down}>
                    <div className={styles.banner_info}>
                        <ul>
                            <li><a href="#product_description">产品描述</a></li>
                            <li><a href="#user_comments">用户评价</a></li>
                            <li><a href="#service_guarantee">服务保障</a></li>
                            <li><a href="#common_problem">常见问题</a></li>
                        </ul>
                    </div>

                    <div id="product_description" className={styles.each_info}>
                        产品描述：{this.state.goods.goodsIntroduction}
                    </div>

                    <div id="user_comments" className={styles.each_info}>
                        这里是用户评价
                    </div>

                    <div id="service_guarantee" className={styles.each_info}>
                        这里是服务保障
                    </div>

                    <div id="common_problem" className={styles.each_info}>
                        这里是常见问题
                    </div>
                </div>
            </div>
        )
    }
}
GoodsDetail.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(GoodsDetail);