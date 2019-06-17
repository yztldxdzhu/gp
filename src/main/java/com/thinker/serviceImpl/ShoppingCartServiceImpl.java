package com.thinker.serviceImpl;

import com.thinker.domain.ShoppingCart;
import com.thinker.mapper.ShoppingCartMapper;
import com.thinker.service.ShoppingCartService;
import com.thinker.util.DateUtil;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/13.
 */
@Component
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartMapper shoppingCartMapper;

    //添加购物车
    @Override
    public void addShoppingCart(ShoppingCart shoppingCart){
        shoppingCart.setUserId(SessionUtil.getCurrentUser().getUserId());
        shoppingCart.setShoppingcartTime(DateUtil.getCurrentTime());
        shoppingCartMapper.insertShoppingCart(shoppingCart);
    }

    //查找购物车
    @Override
    public ShoppingCart findShoppingCartBYShoppingCartId(int shoppingcartId){
        return shoppingCartMapper.selectShoppingCartBYShoppingCartId(shoppingcartId);
    }

    //查找用户所有购物车
    @Override
    public List<ShoppingCart> findAllShoppingCartByUserId(int userId){
        return shoppingCartMapper.selectAllShoppingCartByUserId(userId);
    }

    //修改购物车商品数量
    @Override
    public void modifyShoppingCartGoodsCount(int shoppingcartId,int goodsCount){
        shoppingCartMapper.updateShoppingCartGoodsCount(shoppingcartId,goodsCount);
    }

    //删除购物车
    @Override
    public void deleteShoppingCartByShoppingCartId(int shoppingcartId){
        shoppingCartMapper.deleteShoppingCartByShoppingCartId(shoppingcartId);
    }

    //更新购物车
    @Override
    public void updateShoppingCart(ShoppingCart shoppingCart){
        shoppingCart.setShoppingcartTime(DateUtil.getCurrentTime());
        shoppingCartMapper.updateShoppingCart(shoppingCart);
    }
}
