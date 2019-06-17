package com.thinker.serviceImpl;

import com.thinker.domain.Comment;
import com.thinker.domain.Goods;
import com.thinker.mapper.CommentMapper;
import com.thinker.mapper.GoodsMapper;
import com.thinker.redis.RedisUtils;
import com.thinker.search.BaseIndex;
import com.thinker.search.GoodsIndex;
import com.thinker.service.GoodsService;
import com.thinker.util.JDBCUtil.GoodsJDBC;
import com.thinker.util.MsgGenerate;
import com.thinker.util.annotation.Intercept;
import com.thinker.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import static com.thinker.util.ResultMap.generateFailureMsg;

/**
 * Created by LJ on 2017/5/11.
 */
@Component
public class GoodsServiceImpl implements GoodsService{

    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private RedisUtils<Goods> redisUtils;

    //添加商品
    @Override
    public boolean addGoods(Goods goods){
        GoodsJDBC goodsJDBC = new GoodsJDBC();
        return goodsJDBC.insertGoods(goods);
    }

    //更新商品
    @Override
    public void updateGoods(Goods goods){
        goodsMapper.updateGoods(goods);
    }

    //根据商品ID查找商品
    @Override
    public Goods findGoodsByGoodsId(int goodsId){
        Goods goods = goodsMapper.selectGoodsBYGoodsId(goodsId);
        if(goods != null){
            List<Comment> commentList = commentMapper.selectAllCommentByGoodsId(goodsId);
            if(commentList != null && commentList.size() != 0){
                goods.setCommentList(commentList);
                goods.setCommentCount(commentList.size());
            }
        }
        return goods;
    }

    //查找所有商品
    @Intercept
    public List<Goods> findAllGoods(){
        return goodsMapper.selectAllGoods();
    }

    //根据商品类别查找所有商品
    @Intercept
    public List<Goods> findAllGoodsByGoodsType(String goodsType){
        return goodsMapper.selectAllGoodsByGoodsType(goodsType);
    }

    //审核商品
    @Override
    public void modifyGoodsStatusByGoodsId(int goodsStatus,int goodsId){
        goodsMapper.updateGoodsStatusByGoodsId(goodsStatus,goodsId);
    }

    //删除商品
    @Override
    public void deleteGoodsByGoodsId(int goodsId){
        goodsMapper.deleteGoodsByGoodsId(goodsId);
    }

    //批量删除商品
    @Override
    public void deleteBatchGoods(List<Integer> goodsIdList){
        goodsMapper.deleteBatchGoods(goodsIdList);
    }

    //更新商品库存
    @Override
    public void updateGoodsStock(int goodsId,int incrementCount){
        int totalGoodsStock = incrementCount;
        Integer goodsStock = goodsMapper.selectGoodsStockByGoodsId(goodsId);
        if(goodsStock != null) totalGoodsStock += goodsStock;
        goodsMapper.updateGoodsStock(goodsId,totalGoodsStock);

    }

    //搜索商品
    @Override
    public Map<String,Object> searchGoods(String goodsKeyWords){
        BaseIndex<Goods> goodsIndex = new GoodsIndex(redisUtils);
        try {
            List<Goods> goodsList = goodsIndex.searchGoods(goodsKeyWords);
            return generateGoodsListMap(goodsList);
        } catch (Exception e) {
            throw new MessageException("搜索失败！");
        }
    }

    //分页搜索商品
    @Override
    public Map<String,Object> searchGoodsByPage(String goodsKeyWords,int pageNow,int pageSize){
        BaseIndex<Goods> goodsIndex = new GoodsIndex(redisUtils);
        try {
            List<Goods> goodsList = goodsIndex.searchGoodsByPage(goodsKeyWords,pageNow,pageSize);
            return generateGoodsListMap(goodsList);
        } catch (Exception e) {
            throw new MessageException("搜索失败！");
        }
    }

    //得到商品的Map集合
    private Map<String,Object> generateGoodsListMap(List<Goods> goodsList){
        if(goodsList != null && goodsList.size() != 0){
            Map<String,Object> map = MsgGenerate.bindMapMsg("goodsList",goodsList);
            map.put("success",true);
            map.put("msg","搜索成功！");
            return map;
        }else{
            return generateFailureMsg("没有搜到商品！");
        }
    }
}
