package com.thinker.controller;

import com.thinker.domain.ShoppingCart;
import com.thinker.service.ShoppingCartService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 购物车管理
 * Created by LJ on 2017/5/13.
 */
@Controller
@RequestMapping(value="/shoppingCart")
public class ShoppingCartController extends BaseController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    //添加购物车
    @RequestMapping(value="/addShoppingCart")
    @ResponseBody
    public Map<String,Object> addShoppingCart(@ModelAttribute ShoppingCart shoppingCart){
        shoppingCartService.addShoppingCart(shoppingCart);
        return generateSuccessMsg("购物车添加成功！");
    }

    //查找购物车
    @RequestMapping(value="/findShoppingCartBYShoppingCartId")
    @ResponseBody
    public Map<String,Object> findShoppingCartBYShoppingCartId(@RequestParam(value="shoppingcartId") Integer shoppingcartId){
        ShoppingCart shoppingCart = shoppingCartService.findShoppingCartBYShoppingCartId(shoppingcartId);
        return MsgGenerate.bindMapMsg("shoppingCart",shoppingCart);
    }

    //根据用户ID查找所有用户购物车
    @RequestMapping(value="/findAllUserShoppingCart")
    @ResponseBody
    public Map<String,Object> findAllUserShoppingCart(){
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<ShoppingCart> shoppingCartList = shoppingCartService.findAllShoppingCartByUserId(userId);
        return MsgGenerate.bindMapMsg("shoppingCartList",shoppingCartList);
    }

    //修改购物车商品购买数量
    @RequestMapping(value="/ModifyShoppingCartGoodsCount")
    @ResponseBody
    public Map<String,Object> ModifyShoppingCartGoodsCount(@RequestParam int shoppingCartId,@RequestParam int goodsCount){
        shoppingCartService.modifyShoppingCartGoodsCount(shoppingCartId,goodsCount);
        return generateSuccessMsg("商品数量修改成功！");
    }

    //删除购物车
    @RequestMapping(value="/deleteShoppingCartByShoppingCartId")
    @ResponseBody
    public Map<String,Object> deleteShoppingCartByShoppingCartId(@RequestParam(value="shoppingcartId") Integer shoppingcartId){
        shoppingCartService.deleteShoppingCartByShoppingCartId(shoppingcartId);
        return generateSuccessMsg("购物车删除成功！");
    }

    //更新购物车
    @RequestMapping(value="/updateShoppingCart")
    @ResponseBody
    public Map<String,Object> updateShoppingCart(@ModelAttribute ShoppingCart shoppingCart){
        shoppingCartService.updateShoppingCart(shoppingCart);
        return generateSuccessMsg("购物车更新成功！");
    }
}
