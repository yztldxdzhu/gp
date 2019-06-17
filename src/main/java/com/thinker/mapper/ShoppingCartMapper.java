package com.thinker.mapper;

import com.thinker.domain.ShoppingCart;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/13.
 */
@Component
public interface ShoppingCartMapper {

    void insertShoppingCart(ShoppingCart shoppingCart);

    ShoppingCart selectShoppingCartBYShoppingCartId(int shoppingCartId);

    List<ShoppingCart> selectAllShoppingCartByUserId(int userId);

    List<ShoppingCart> selectShoppingCartByShoppingCartIdList(List<Integer> shoppingCartIdList);

    void deleteShoppingCartByShoppingCartId(int shoppingCartId);

    void updateShoppingCart(ShoppingCart shoppingCart);

    void updateShoppingCartGoodsCount(@Param(value="shoppingCartId") int shoppingCartId,@Param(value="goodsCount") int goodsCount);
}
