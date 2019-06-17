package com.thinker.service;

import com.thinker.domain.ShoppingCart;

import java.util.List;

/**
 * Created by LJ on 2017/5/13.
 */
public interface ShoppingCartService {

    void addShoppingCart(ShoppingCart shoppingCart);

    ShoppingCart findShoppingCartBYShoppingCartId(int shoppingcartId);

    List<ShoppingCart> findAllShoppingCartByUserId(int userId);

    void deleteShoppingCartByShoppingCartId(int shoppingcartId);

    void modifyShoppingCartGoodsCount(int shoppingcartId,int goodsCount);

    void updateShoppingCart(ShoppingCart shoppingCart);
}
