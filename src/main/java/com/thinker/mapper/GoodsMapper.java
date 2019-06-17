package com.thinker.mapper;

import com.thinker.domain.Goods;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/11.
 */
@Component
public interface GoodsMapper {

    Goods selectGoodsBYGoodsId(int goodsId);

    List<Goods> selectAllGoods();

    List<Goods> selectAllGoodsByGoodsType(String goodsType);

    void updateGoodsStatusByGoodsId(@Param(value="goodsStatus") int goodsStatus, @Param(value="goodsId") int goodsId);

    void updateGoods(Goods goods);

    void updateGoodsStock(@Param(value="goodsId") int goodsId,@Param(value="goodsStock") int goodsStock);

    void deleteGoodsByGoodsId(int goodsId);

    void deleteBatchGoods(List<Integer> goodsIdList);

    int selectGoodsPriceByGoodsId(int goodsId);

    Integer selectGoodsStockByGoodsId(int goodsId);

    int selectGoodsSuccesscountBYGoodsId(int goodsId);

    void updateGoodsSuccesscount(@Param(value="goodsId") int goodsId,@Param(value="goodsSuccesscount") int goodsSuccesscount);

}

