package com.thinker.serviceImpl;

import com.thinker.domain.Order;
import com.thinker.domain.Orderitem;
import com.thinker.domain.ShoppingCart;
import com.thinker.mapper.GoodsMapper;
import com.thinker.mapper.OrderMapper;
import com.thinker.mapper.ShoppingCartMapper;
import com.thinker.service.OrderService;
import com.thinker.util.DateUtil;
import com.thinker.util.MsgGenerate;
import com.thinker.util.random.RandomUtil;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created by LJ on 2017/5/12.
 */
@Component
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private ShoppingCartMapper shoppingCartMapper;

    //直接购买生成订单
    @Override
    public void createOrderFromGoods(Order order,int goodsId,int goodsCount){
        if(order.getAddressId() == 0) order.setAddressId(null);
        String ordersNumber = RandomUtil.createOrderNumber();
        order.setUserId(SessionUtil.getCurrentUser().getUserId());
        order.setOrderTime(DateUtil.getCurrentTime());
        order.setOrdersNumber(ordersNumber);
        int goodsPrice = goodsMapper.selectGoodsPriceByGoodsId(goodsId);
        order.setOrderTotal(goodsPrice*goodsCount);
        orderMapper.insertOrder(order);
        Orderitem orderitem = new Orderitem();
        orderitem.setOrdersNumber(ordersNumber);
        orderitem.setGoodsId(goodsId);
        orderitem.setOrderitemCount(goodsCount);
        orderitem.setOrderitemSubtotal(goodsPrice*goodsCount);
        orderitem.setOrderitemStatus(1);
        orderMapper.insertOrderitem(orderitem);
    }

    //根据购物车生成订单
    @Override
    public void createOrderFromShoppingCart(List<Integer> shoppingCartIdList,Integer addressId){
        String ordersNumber = RandomUtil.createOrderNumber();
        List<ShoppingCart> shoppingCartList = shoppingCartMapper.selectShoppingCartByShoppingCartIdList(shoppingCartIdList);
        Order order = new Order();
        order.setUserId(SessionUtil.getCurrentUser().getUserId());
        order.setOrderTime(DateUtil.getCurrentTime());
        order.setOrdersNumber(ordersNumber);
        int orderTotal = 0;
        for(ShoppingCart shoppingCart:shoppingCartList){
            int goodsPrice = shoppingCart.getGoods().getGoodsPrice();
            int goodsCount = shoppingCart.getShoppingcartBuycount();
            orderTotal += goodsPrice*goodsCount;
        }
        order.setOrderTotal(orderTotal);
        if(addressId == 0) {
            order.setAddressId(null);  //零表示是非商品服务
        }else{
            order.setAddressId(addressId);
        }
        orderMapper.insertOrder(order);
        for(ShoppingCart shoppingCart:shoppingCartList){
            int goodsPrice = shoppingCart.getGoods().getGoodsPrice();
            int goodsCount = shoppingCart.getShoppingcartBuycount();
            Orderitem orderitem = new Orderitem();
            orderitem.setOrderitemCount(shoppingCart.getShoppingcartBuycount());
            orderitem.setOrderitemSubtotal(goodsPrice*goodsCount);
            orderitem.setGoodsId(shoppingCart.getGoodsId());
            orderitem.setOrdersNumber(ordersNumber);
            orderitem.setOrderitemStatus(1);
            orderMapper.insertOrderitem(orderitem);
        }
    }

    //根据ID查找订单明细的详细信息
    @Override
    public Orderitem findOrderitemByOrderitemId(int orderittemId){
        return orderMapper.selectOrderitemByOrderitemId(orderittemId);
    }

    //根据状态查找用户订单
    @Override
    public List<Order> findUserOrderByStatus(int userId,Integer... status){
        if(status != null && status.length != 0){
            return orderMapper.selectAllOrderByStatus(userId,status[0]);
        }
        return orderMapper.selectAllOrderByUserId(userId);
    }

    //根据订单项ID取消订单
    @Override
    public Map<String,Object> cancelOrderitemByOrderitemId(int orderitemId){
        Orderitem orderitem = orderMapper.selectOrderitemByOrderitemId(orderitemId);
        if(orderitem.getOrderitemStatus() == 1){
            orderMapper.updateOrderitemStatus(orderitemId,5);
            return MsgGenerate.getSuccessMap("取消订单成功！");
        }else{
            return MsgGenerate.getErrorMap("取消订单失败！");
        }
    }

    //根据订单ID取消订单
    @Override
    public void cancelOrderByOrderId(int orderId){
        List<Orderitem> orderitemList = orderMapper.selectOrderitemByOrderId(orderId);
        for(Orderitem orderitem:orderitemList){
            if(orderitem.getOrderitemStatus() == 1){
                orderMapper.updateOrderitemStatus(orderitem.getOrderitemId(),5);
            }
        }
    }

    //确认收货
    @Override
    public Map<String,Object> confirmOrderitem(int orderitemId) {
        Orderitem orderitem = orderMapper.selectOrderitemByOrderitemId(orderitemId);
        if(orderitem.getOrderitemStatus() == 3){
            orderMapper.updateOrderitemStatus(orderitemId,4);
            int goodsSuccesscount = goodsMapper.selectGoodsSuccesscountBYGoodsId(orderitem.getGoodsId());
            goodsMapper.updateGoodsSuccesscount(orderitem.getGoodsId(),(goodsSuccesscount+orderitem.getOrderitemCount()));
            return MsgGenerate.getSuccessMap("确认收货成功！");
        }else{
            return MsgGenerate.getErrorMap("商家还未发货！");
        }
    }

}
