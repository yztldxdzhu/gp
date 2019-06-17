package com.thinker.controller;

import com.thinker.domain.Goods;
import com.thinker.service.GoodsService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.image.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 商品管理
 * Created by LJ on 2017/5/11.
 */
@Controller
@RequestMapping(value="/goods")
public class GoodsController extends BaseController {

    @Autowired
    private GoodsService goodsService;
    private static final String GOODSTPATH = "public"+ File.separator+"images"+ File.separator+"upload"+ File.separator+"goodsPic";

    //添加商品
    @RequestMapping(value="/addGoods")
    @ResponseBody
    public Map<String,Object> addGoods(@ModelAttribute Goods goods){
        MultipartFile userMultipartFile = goods.getGoodsPictureContent();
        if(userMultipartFile != null){
            String pictureUrl = ImageUtil.upload(userMultipartFile,GOODSTPATH);
            goods.setGoodsPicture(pictureUrl);
        }else{
            return generateFailureMsg("头像上传失败！请重新上传！");
        }
        boolean flag = goodsService.addGoods(goods);
        if(flag){
            return generateSuccessMsg("商品添加成功！");
        }else{
            return generateFailureMsg("商品添加失败！");
        }
    }

    //搜索商品
    @RequestMapping(value="/searchGoods")
    @ResponseBody
    public Map<String,Object> searchGoods(@RequestParam(value="goodsKeyWords") String goodsKeyWords){
        return goodsService.searchGoods(goodsKeyWords);

    }

    //搜索商品
    @RequestMapping(value="/searchGoodsByPage")
    @ResponseBody
    public Map<String,Object> searchGoodsByPage(@RequestParam(value="goodsKeyWords") String goodsKeyWords,@RequestParam(value="pageNow") Integer pageNow,@RequestParam(value="pageSize") Integer pageSize){
        return goodsService.searchGoodsByPage(goodsKeyWords,pageNow,pageSize);
    }

    //更新商品信息
    @RequestMapping(value="/updateGoods")
    @ResponseBody
    public Map<String,Object> updateGoods(@ModelAttribute Goods goods){
        goodsService.updateGoods(goods);
        return generateSuccessMsg("商品更新成功！");
    }

    //查找商品
    @RequestMapping(value="/findGoodsByGoodsId")
    @ResponseBody
    public Map<String,Object> findGoodsByGoodsId(@RequestParam(value="goodsId") Integer goodsId){
        Goods goods = goodsService.findGoodsByGoodsId(goodsId);
        return MsgGenerate.bindMapMsg("goods",goods);
    }

    //查找所有商品
    @RequestMapping(value="/findAllGoods")
    @ResponseBody
    public Map<String,Object> findAllGoods(){
        List<Goods> goodsList = goodsService.findAllGoods();
        return MsgGenerate.bindMapMsg("goodsList",goodsList);
    }

    //根据商品类别查找所有商品
    @RequestMapping(value="/findAllGoodsByGoodsType")
    @ResponseBody
    public Map<String,Object> findAllGoodsByGoodsType(@RequestParam String goodsType){
        List<Goods> goodsList = goodsService.findAllGoodsByGoodsType(goodsType);
        return MsgGenerate.bindMapMsg("goodsList",goodsList);
    }

    //审核商品
    @RequestMapping(value="/modifyGoodsStatusByGoodsId")
    @ResponseBody
    public Map<String,Object> modifyGoodsStatusByGoodsId(@RequestParam(value="goodsId") Integer goodsId,@RequestParam(value="goodsStatus") Integer goodsStatus){
        goodsService.modifyGoodsStatusByGoodsId(goodsStatus,goodsId);
        return generateSuccessMsg("商品审核成功！");
    }

    //删除商品
    @RequestMapping(value="/deleteGoodsByGoodsId")
    @ResponseBody
    public Map<String,Object> deleteGoodsByGoodsId(@RequestParam(value="goodsId") Integer goodsId){
        goodsService.deleteGoodsByGoodsId(goodsId);
        return generateSuccessMsg("商品删除成功！");
    }

    //批量删除商品
    @RequestMapping(value="/deleteBatchGoods")
    @ResponseBody
    public Map<String,Object> deleteBatchGoods(@RequestParam String goodsIdStr){
        String[] goodsIdArray = goodsIdStr.split(",");
        List<Integer> goodsIdList = new ArrayList<>();
        for(String goodsId:goodsIdArray){
            goodsIdList.add(Integer.valueOf(goodsId));
        }
        goodsService.deleteBatchGoods(goodsIdList);
        return generateSuccessMsg("商品批量删除成功！");
    }

    //添加库存
    @RequestMapping(value="/updateGoodsStock")
    @ResponseBody
    public Map<String,Object> updateGoodsStock(@RequestParam int goodsId,@RequestParam int incrementCount){
        goodsService.updateGoodsStock(goodsId,incrementCount);
        return generateSuccessMsg("库存更新成功！");
    }
}
