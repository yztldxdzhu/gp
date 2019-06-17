import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/goods.css';

class BuyDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            goods: {
                commentList: [],
                scoreList: []
            },
            addressList: [],
            addAddress: 'none',

            addressId: 0,
            addressArea: '',
            addressDetail: '',
            addressPostcode: '',
            addressReceivingname: '',
            addressPhone: '',
            addressIsdefault: 0,//0默认表示不是
            button: '提交地址'
        };
        this.addAddress = this.addAddress.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }
    componentDidMount(){
        console.log(this.props);
        let { dispatch, actions, goodsId } = this.props;
        dispatch(actions.getAllAddress(this));//获取地址信息

        let data = {};
        data.goodsId = goodsId;
        dispatch(actions.getGoodsById(data, this));//获取商品信息
    }
    addAddress(){
        this.setState({button: '提交中...'});
        let { dispatch, actions } = this.props;
        let data = {};
        data.addressArea = this.state.addressArea;
        data.addressDetail = this.state.addressDetail;
        data.addressPostcode = this.state.addressPostcode;
        data.addressReceivingname = this.state.addressReceivingname;
        data.addressPhone = this.state.addressPhone;
        data.addressIsdefault = this.state.addressIsdefault;
        if(!data.addressArea){
            alert('请输入所在区域！');
            this.setState({button: '提交地址'});
        }
        else if(!data.addressDetail){
            alert('请输入地址详情！');
            this.setState({button: '提交地址'});
        }
        else if(!data.addressPostcode){
            alert('请输入邮政编码！');
            this.setState({button: '提交地址'});
        }
        else if(!data.addressReceivingname){
            alert('请输入收件人姓名！');
            this.setState({button: '提交地址'});
        }
        else if(!data.addressPhone){
            alert('请输入联系方式！');
            this.setState({button: '提交地址'});
        }
        dispatch(actions.addAddress(data, this));
    }
    submitOrder(){
        let { dispatch, actions, goodsId, goodsBuyCount } = this.props;
        let data = {};
        data.addressId = this.state.addressId;
        data.goodsId = goodsId;
        data.goodsCount = goodsBuyCount;
        dispatch(actions.BuyGoods(data, this));
    }
    render(){
        return (
            <div className={styles.goods_detail} style={{marginTop: '145px'}}>
                <div className={styles.buy_row}>
                    <h3>确认收货地址</h3>
                    <div className={styles.address_all} onChange={(e) => {this.setState({addressId: e.target.id})}}>
                        {this.state.addressList.length == 0 || this.state.addressList == null ? (
                            <div>暂无地址数据</div>
                            ) : (
                                this.state.addressList.map((address, i) => {
                                    return (
                                        <div className={styles.address_each} key={i}>
                                            <input type="radio" name="address" id={address.addressId} defaultChecked={address.addressIsdefault == 1 ? "defaultChecked" : ''}/>
                                            <span>{address.addressArea} {address.addressDetail}（{address.addressReceivingname} 收）{address.addressPhone} <small>{address.addressIsdefault == 1 ? ('默认地址') : ('')}</small></span>
                                        </div>
                                    )
                                })
                            )}
                    </div>
                    <button className={styles.add_address} onClick={() => {this.setState({addAddress: 'block'})}}>+新增收货地址</button>
                    <form className={styles.address_form} style={{display: this.state.addAddress == 'block' ? "block" : "none"}}>
                        <div className={styles.form_each}>
                            <label htmlFor="addressArea">所在地区</label>
                            <input type="text" id="addressArea" onChange={(e) => {this.setState({addressArea: e.target.value})}} placeholder="例如：安徽省合肥市包河区"/>
                        </div>
                        <div className={styles.form_each}>
                            <label htmlFor="addressDetail">详细地址</label>
                            <input type="text" id="addressDetail" onChange={(e) => {this.setState({addressDetail: e.target.value})}} placeholder="例如：屯溪路合肥工业大学"/>
                        </div>
                        <div className={styles.form_each}>
                            <label htmlFor="addressPostcode">邮政编码</label>
                            <input type="text" id="addressPostcode" onChange={(e) => {this.setState({addressPostcode: e.target.value})}} placeholder="邮政编码"/>
                        </div>
                        <div className={styles.form_each}>
                            <label htmlFor="addressReceivingname">收货人姓名</label>
                            <input type="text" id="addressReceivingname" onChange={(e) => {this.setState({addressReceivingname: e.target.value})}} placeholder="收货人姓名"/>
                        </div>
                        <div className={styles.form_each}>
                            <label htmlFor="addressPhone">手机号码</label>
                            <input type="text" id="addressPhone" onChange={(e) => {this.setState({addressPhone: e.target.value})}} placeholder="联系号码"/>
                        </div>
                        <div className={styles.form_each}>
                            <label htmlFor="addressIsdefault">设为默认</label>
                            <div className={styles.set_default} onChange={(e)=>{this.setState({addressIsdefault: e.target.id})}}>
                                <label htmlFor="yes">是</label>
                                <input type="radio" name="addressIsdefault" id="1"/>
                                <label htmlFor="no">否</label>
                                <input type="radio" name="addressIsdefault" id="0" defaultChecked="defaultChecked"/>
                            </div>
                        </div>
                        <div className={styles.form_each}>
                            <button type="button" onClick={this.addAddress}>{this.state.button}</button>
                        </div>
                    </form>
                </div>

                <div className={styles.buy_row}>
                    <h3>确认订单详情</h3>
                    <ul className={styles.order_header}>
                        <li>商品</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>小计</li>
                    </ul>
                    <ul className={styles.goods_each}>
                        <li className={styles.goods_each_img}>
                            <img src={'/gp/' + this.state.goods.goodsPicture} alt={this.state.goods.goodsName} width={50} height={50} id={this.state.goods.goodsId}/>
                            <span id={this.state.goods.goodsId}>{this.state.goods.goodsName}</span>
                        </li>
                        <li>{this.state.goods.goodsPrice}</li>
                        <li>{this.props.goodsBuyCount}</li>
                        <li>{this.state.goods.goodsPrice * this.props.goodsBuyCount}</li>
                    </ul>
                    <button className={styles.submit_order} onClick={this.submitOrder}>提交订单</button>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(BuyDetail);