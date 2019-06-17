import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/mall.css';

class StudyMall extends Component{
    constructor(props){
        super(props);
        this.state = {
            goodsList: [],
            loading: '加载中...'
        };
        this.getGoodsById = this.getGoodsById.bind(this);
        this.searchByGoodsType = this.searchByGoodsType.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions, state } = this.props;
        if(state.SearchReducers.success){
            this.setState({goodsList: state.SearchReducers.dataList});
        }else if((!state.SearchReducers.success) && (state.SearchReducers.errMsg)){
            this.setState({loading: state.SearchReducers.errMsg});
        }else{
            dispatch(actions.getAllGoods(this));
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.state.SearchReducers.success){
            this.setState({goodsList: nextProps.state.SearchReducers.dataList});
        }
    }
    getGoodsById(e){
        this.context.router.push({
            pathname: '/studyMall/goods',
            state: { goodsId: e.target.id }
        });
    }
    searchByGoodsType(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.goodsType = e.target.id;
        if(e.target.id == '全部'){
            dispatch(actions.getAllGoods(this));
        }else{
            dispatch(actions.searchByGoodsType(data, this));
        }
    }
    addToCart(e){
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
            <div className={styles.category} style={{marginTop: '145px'}}>
                <div className={styles.category_each}>
                    <span>留学目标</span>
                    <ul>
                        <li>全部</li>
                        <li>研究生</li>
                        <li>本科</li>
                        <li>高中</li>
                    </ul>
                </div>

                <div className={styles.category_each}>
                    <span>商品类别</span>
                    <ul onClick={this.searchByGoodsType}>
                        <li id="全部">全部</li>
                        <li id="全程申请">全程申请</li>
                        <li id="院校申请">院校申请</li>
                        <li id="签证申请">签证申请</li>
                        <li id="文书写作">文书写作</li>
                        <li id="文件翻译">文件翻译</li>
                        <li id="语言课程">语言课程</li>
                        <li id="其它">其它</li>
                    </ul>
                </div>

                <div className={styles.category_each_last}>
                    <ul>
                        <li>综合</li>
                        <li>最新</li>
                        <li>最热</li>
                        <li>价格</li>
                        <li>
                            <input type="text" className={styles.search_text}/>
                            <input type="button" className={styles.search_btn}/>
                        </li>
                    </ul>
                </div>

                {this.state.goodsList.length == 0 || this.state.goodsList == null ? (
                        <div className={styles.goods_no}>
                            {this.state.loading}
                        </div>
                    ) : (
                        this.state.goodsList.map((goods, i)=>{
                            return(
                                <div className={styles.mall_goods_each} key={i}>
                                    <p id={goods.goodsId} onClick={this.getGoodsById}>
                                        <img src={'/gp/'+goods.goodsPicture} alt={goods.goodsName} id={goods.goodsId}/>
                                    </p>
                                    <div className={styles.mall_goods_each_desc}>
                                        <p className={styles.mall_goods_each_name} dangerouslySetInnerHTML={{__html: goods.goodsName ? goods.goodsName : '无'}}/>
                                        <p className={styles.price}>
                                            <span className={styles.new_price}>￥{goods.goodsPrice}.00</span>
                                            <span className={styles.old_price}>¥12000.00</span>
                                        </p>
                                        <p className={styles.add_to_car} id={goods.goodsId} onClick={this.addToCart}>加入购物车</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
            </div>
        );
    }
}
StudyMall.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(StudyMall);