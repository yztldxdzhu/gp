package com.thinker.controller;

import com.thinker.domain.Order;
import com.thinker.domain.Orderitem;
import com.thinker.service.OrderService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 订单管理
 * Created by LJ on 2017/5/12.
 */
@Controller
@RequestMapping(value="/order")
public class OrderController extends BaseController {

    @Autowired
    private OrderService orderService;

    //直接购买产生订单
    @RequestMapping(value="/createOrderFromGoods")
    @ResponseBody
    public Map<String,Object> createOrderFromGoods(@ModelAttribute Order order,@RequestParam int goodsId,@RequestParam int goodsCount){
        orderService.createOrderFromGoods(order,goodsId,goodsCount);
        return generateSuccessMsg("添加订单成功！");
    }

    //根据购物车生成订单
    @RequestMapping(value="/createOrderFromShoppingCart")
    @ResponseBody
    public Map<String,Object> createOrderFromShoppingCart(@RequestParam String shoppingCartIdStr,@RequestParam Integer addressId){
        String[] shoppingCartIdArray = shoppingCartIdStr.split(",");
        List<Integer> shoppingCartIdList = new ArrayList<>();
        for(String shoppingCartId:shoppingCartIdArray){
            shoppingCartIdList.add(Integer.valueOf(shoppingCartId));
        }
        orderService.createOrderFromShoppingCart(shoppingCartIdList,addressId);
        return generateSuccessMsg("添加订单成功！");
    }

    //根据订单明细ID查找订单明细的详细信息(包括订单信息)
    @RequestMapping(value="/findOrderitemByOrderitemId")
    @ResponseBody
    public Map<String,Object> findOrderitemByOrderitemId(@RequestParam(value="orderitemId") Integer orderitemId){
        Orderitem orderitem = orderService.findOrderitemByOrderitemId(orderitemId);
        return MsgGenerate.bindMapMsg("orderitem",orderitem);
    }

    //根据用户ID查找用户所有订单
    @RequestMapping(value="/findAllUserOrder")
    @ResponseBody
    public Map<String,Object> findAllUserOrder(){
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<Order> orderList = orderService.findUserOrderByStatus(userId);
        return MsgGenerate.bindMapMsg("orderList",orderList);
    }

    //根据订单状态查找用户订单
    @RequestMapping(value="/findUserOrderByStatus")
    @ResponseBody
    public Map<String,Object> findUserOrderByStatus(@RequestParam Integer status){
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<Order> orderList = orderService.findUserOrderByStatus(userId,status);
        return MsgGenerate.bindMapMsg("orderList",orderList);
    }

    //根据订单项ID取消订单
    @RequestMapping(value="/cancelOrderitemByOrderitemId")
    @ResponseBody
    public Map<String,Object> cancelOrderitemByOrderitemId(@RequestParam(value="orderitemId") Integer orderitemId){
        return orderService.cancelOrderitemByOrderitemId(orderitemId);
    }

    //根据订单ID取消订单
    @RequestMapping(value="/cancelOrderByOrderId")
    @ResponseBody
    public Map<String,Object> cancelOrderByOrderId(@RequestParam(value="orderId") Integer orderId){
        orderService.cancelOrderByOrderId(orderId);
        return generateSuccessMsg("订单取消成功！");
    }

    //批量取消订单
    @RequestMapping(value="/cancelBatchOrder")
    @ResponseBody
    public Map<String,Object> cancelBatchOrder(@RequestParam(value="orderIdStr") String orderIdStr){
        String[] orderIdList = orderIdStr.split(",");
        for(String orderId:orderIdList){
            orderService.cancelOrderByOrderId(Integer.parseInt(orderId));
        }
        return generateSuccessMsg("批量订单取消成功！");
    }

    //确认收货
    @RequestMapping(value="/confirmOrderitem")
    @ResponseBody
    public Map<String,Object> confirmOrderitem(@RequestParam(value="orderitemId") Integer orderitemId){
        return orderService.confirmOrderitem(orderitemId);
    }

}
