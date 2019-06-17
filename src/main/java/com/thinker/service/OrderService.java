package com.thinker.service;

import com.thinker.domain.Order;
import com.thinker.domain.Orderitem;

import java.util.List;
import java.util.Map;

/**
 * Created by LJ on 2017/5/12.
 */
public interface OrderService {

    void createOrderFromGoods(Order order,int goodsId,int goodsCount);

    Orderitem findOrderitemByOrderitemId(int orderittemId);

    List<Order> findUserOrderByStatus(int userId,Integer... status);

    Map<String,Object> cancelOrderitemByOrderitemId(int orderitemId);

    void cancelOrderByOrderId(int orderId);

    Map<String,Object> confirmOrderitem(int orderitemId);

    void createOrderFromShoppingCart(List<Integer> shoppingCartList,Integer addressId);

}
