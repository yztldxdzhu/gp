package com.thinker.service;

import com.thinker.domain.Goods;
import com.thinker.util.annotation.Intercept;

import java.util.List;
import java.util.Map;

/**
 * Created by LJ on 2017/5/11.
 */
public interface GoodsService {

    boolean addGoods(Goods goods);

    void updateGoods(Goods goods);

    void updateGoodsStock(int goodsId,int incrementCount);

    Goods findGoodsByGoodsId(int goodsId);

    @Intercept
    List<Goods> findAllGoods();

    List<Goods> findAllGoodsByGoodsType(String goodsType);

    void modifyGoodsStatusByGoodsId(int goodsStatus,int goodsId);

    void deleteGoodsByGoodsId(int goodsId);

    void deleteBatchGoods(List<Integer> goodsIdList);

    Map<String,Object> searchGoods(String goodsKeyWords);

    Map<String,Object> searchGoodsByPage(String goodsKeyWords,int pageNow,int pageSize);

}
