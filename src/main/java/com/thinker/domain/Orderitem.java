package com.thinker.domain;

/**
 * Created by LJ on 2017/6/5.
 */
public class Orderitem {

    private int orderitemId;   //订单明细ID

    private int orderitemSubtotal;   //订购商品总金额

    private int orderitemCount;   //订购商品总数量

    private int goodsId;

    private int orderitemStatus;  // 订单状态：1未付款, 2已付款但未发货, 3已发货未确认收货, 4确认收货了交易成功, 5已取消(只有未付款才能取消)

    private String ordersNumber;   //订单编号

    private Order order;

    private Goods goods;

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getOrderitemStatus() {
        return orderitemStatus;
    }

    public void setOrderitemStatus(int orderitemStatus) {
        this.orderitemStatus = orderitemStatus;
    }

    public int getOrderitemId() {
        return orderitemId;
    }

    public void setOrderitemId(int orderitemId) {
        this.orderitemId = orderitemId;
    }

    public int getOrderitemSubtotal() {
        return orderitemSubtotal;
    }

    public void setOrderitemSubtotal(int orderitemSubtotal) {
        this.orderitemSubtotal = orderitemSubtotal;
    }

    public int getOrderitemCount() {
        return orderitemCount;
    }

    public void setOrderitemCount(int orderitemCount) {
        this.orderitemCount = orderitemCount;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public String getOrdersNumber() {
        return ordersNumber;
    }

    public void setOrdersNumber(String ordersNumber) {
        this.ordersNumber = ordersNumber;
    }
}

