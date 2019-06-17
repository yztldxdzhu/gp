package com.thinker.domain;

import java.sql.Timestamp;

/**
 * Created by LJ on 2017/5/11.
 */
public class ShoppingCart {

    private int shoppingcartId;

    private int userId;

    private int goodsId;

    private Timestamp shoppingcartTime;   //购物车添加时间

    private int shoppingcartBuycount;   //购买商品数量

    private Goods goods;

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public Timestamp getShoppingcartTime() {
        return shoppingcartTime;
    }

    public void setShoppingcartTime(Timestamp shoppingcartTime) {
        this.shoppingcartTime = shoppingcartTime;
    }

    public int getShoppingcartBuycount() {
        return shoppingcartBuycount;
    }

    public void setShoppingcartBuycount(int shoppingcartBuycount) {
        this.shoppingcartBuycount = shoppingcartBuycount;
    }

    public int getShoppingcartId() {
        return shoppingcartId;
    }

    public void setShoppingcartId(int shoppingcartId) {
        this.shoppingcartId = shoppingcartId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

}
