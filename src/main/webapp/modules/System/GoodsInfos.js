import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FileUpload } from '../../modules/Common/CommonComponent';
import styles from '../../public/styles/system/manage.css';

class GoodsInfos extends Component{
    constructor(props){
        super(props);
        this.state = {
            goodsList: [],

            status: 'all_goods',
            button: '提交',

            goodsName: '',
            goodsPrice: '',
            goodsType: '全程申请',
            goodsTarget: '全部',
            goodsIntroduction: '',
            goodsPictureContent: '',
            fileValue: '',

            checked: false,
            goods: []
        };
        this.changePicFile = this.changePicFile.bind(this);
        this.addGoods = this.addGoods.bind(this);//添加商品，信息
        this.deleteGoodsById = this.deleteGoodsById.bind(this);//根据商品ID删除商品
        this.changeSelected = this.changeSelected.bind(this);//选中所有的checkbox
        this.selectGoods = this.selectGoods.bind(this);//选中多个checkbox
        this.deleteSelectedGoods = this.deleteSelectedGoods.bind(this);//删除选中的多个checkbox
    }
    componentDidMount(){
        let {dispatch, actions} = this.props;
        dispatch(actions.getAllGoods(this));
    }
    changePicFile(e){
        this.setState({
            fileValue: e.target.value,
            goodsPictureContent: e.target.files[0]
        })
    }
    addGoods(){
        let {dispatch, actions} = this.props;
        this.setState({button: '提交中...'});
        let formData = new FormData();
        formData.append("goodsName", this.state.goodsName);
        formData.append("goodsPrice", this.state.goodsPrice);
        formData.append("goodsType", this.state.goodsType);
        formData.append("goodsTarget", this.state.goodsTarget);
        formData.append("goodsIntroduction", this.state.goodsIntroduction);
        formData.append("goodsPictureContent", this.state.goodsPictureContent);
        dispatch(actions.addGoods(formData, this));
    }
    deleteGoodsById(e){
        let {dispatch, actions} = this.props;
        let data = {};
        data.goodsId = e.target.id;
        dispatch(actions.deleteGoodsById(data, this));
    }

    changeSelected(e){
        if(e.target.checked){
            this.setState({allChecked: true});
            console.log(1);
        }else{
            this.setState({allChecked: false});
        }
    }

    selectGoods(e){
        let goodsId = e.target.id;
        let goodsList = this.state.goods;
        let index = goodsList.indexOf(goodsId);
        if(index == -1){//不存在就添加
            goodsList.push(goodsId);
        }else{//存在就删除
            goodsList.splice(index, 1);
        }
        this.setState({goods: goodsList});
        if(this.state.goods.length == 0){
            this.setState({checked: false});
        }else{
            this.setState({checked: true});
        }
    }
    deleteSelectedGoods(){
        let {dispatch, actions} = this.props;
        let data = {};
        data.goodsIdStr = this.state.goods.toString();
        dispatch(actions.deleteGoodsBatch(data, this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>商品管理</p>
                <ul className={styles.apply_condi}>
                    <li
                        id="all_goods"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'all_goods' ? '#a22020' : '#ffffff'}}>所有商品</li>
                    <li
                        id="add_goods"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'add_goods' ? '#a22020' : '#ffffff'}}>添加商品</li>

                    <li
                        onClick={this.deleteSelectedGoods}
                        style={{display: this.state.checked ? 'inline-block' : 'none',borderRight: '1px solid #ccc'}}>删除选中</li>
                </ul>
                <div style={{display: this.state.status == "all_goods" ? 'block' : 'none'}}>
                    <ul className={styles.goods_header}>
                        <li>商品</li>
                        <li>商品价格</li>
                        <li>商品类型</li>
                        <li>操作</li>
                    </ul>
                    {this.state.goodsList.map((goods, i)=>{
                        return(
                            <ul className={styles.goods_each} key={i} id={goods.goodsId}>
                                <li id={goods.goodsId} className={styles.goods_each_img}>
                                    <input
                                        type="checkbox"
                                        id={goods.goodsId}
                                        onClick={this.selectGoods}
                                    />
                                    <img src={'/gp/' + goods.goodsPicture} alt={goods.goodsName} width={50} height={50} id={goods.goodsId}/>
                                    <span id={goods.goodsId}>{goods.goodsName}</span>
                                </li>
                                <li id={goods.goodsId}>{goods.goodsPrice}</li>
                                <li id={goods.goodsId}>{goods.goodsType}</li>
                                <li id={goods.goodsId}>
                                    <button type="button" id={goods.goodsId}>编辑</button>
                                    <button type="button" id={goods.goodsId} onClick={this.deleteGoodsById}>删除</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>

                <div className={styles.goods_add} style={{display: this.state.status == "add_goods" ? 'block' : 'none'}}>
                    <form encType="multipart/form-data" className={styles.goods_add_form}>
                        <label htmlFor="goods_name">商品名称</label>
                        <input
                            onChange={(e)=>{this.setState({goodsName: e.target.value})}}
                            type="text"
                            id="goods_name"
                            placeholder="请填写商品名称"
                        />

                        <label htmlFor="goods_price">商品价格</label>
                        <input
                            onChange={(e)=>{this.setState({goodsPrice: e.target.value})}}
                            type="text"
                            id="goods_price"
                            placeholder="请填写商品价格"
                        />

                        <label htmlFor="goods_target">商品适用目标</label>
                        <select id="goods_target" onChange={(e)=>{this.setState({goodsTarget: e.target.value})}}>
                            <option value="全部">全部</option>
                            <option value="高中">高中</option>
                            <option value="大学">大学</option>
                            <option value="研究生">研究生</option>
                        </select>

                        <label htmlFor="goods_type">商品分类</label>
                        <select id="goods_type" onChange={(e)=>{this.setState({goodsType: e.target.value})}}>
                            <option value="全程申请">全程申请</option>
                            <option value="院校申请">院校申请</option>
                            <option value="签证申请">签证申请</option>
                            <option value="文书写作">文书写作</option>
                            <option value="文件翻译">文件翻译</option>
                            <option value="语言课程">语言课程</option>
                            <option value="其它类型">其它类型</option>
                        </select>

                        <label htmlFor="images">商品图片</label>
                        <FileUpload id="images" content={this.state.fileValue} change={this.changePicFile}/>

                        <label htmlFor="">商品描述</label>
                        <textarea
                            onChange={ (e) => {this.setState({goodsIntroduction: e.target.value})} }
                            defaultValue="请输入您的商品描述" />

                        <button type="button" onClick={this.addGoods}>{this.state.button}</button>
                    </form>

                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(GoodsInfos);