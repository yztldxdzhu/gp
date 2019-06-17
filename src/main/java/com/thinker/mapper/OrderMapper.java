package com.thinker.mapper;

import com.thinker.domain.Order;
import com.thinker.domain.Orderitem;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/12.
 */
@Component
public interface OrderMapper {

    void insertOrder(Order order);

    void deleteCancelOrder();

    Orderitem selectOrderitemByOrderitemId(int orderitemId);

    Orderitem selectOrderitemByGoodsId(int goodsId);

    List<Order> selectAllOrderByStatus(@Param(value="userId") int userId,@Param(value="status") Integer status);

    List<Order> selectAllOrderByUserId(int userId);

    List<Orderitem> selectOrderitemByOrderId(int ordersId);

    void updateOrderitemStatus(@Param(value="orderitemId") int orderitemId,@Param(value="orderitemStatus") int orderitemStatus);

    void insertOrderitem(Orderitem orderitem);

}
