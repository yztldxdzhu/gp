package com.thinker.search;

import com.thinker.domain.Goods;
import com.thinker.redis.RedisUtils;
import com.thinker.search.util.FieldType;
import com.thinker.search.util.IKAnalyzer6x;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.highlight.Highlighter;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

/**
 * 商品搜索
 * Created by LJ on 2017/5/13.
 */
public class GoodsIndex extends BaseIndex<Goods>{

    public GoodsIndex(){
        super();
    }

    public GoodsIndex(RedisUtils<Goods> redisUtils){
        super(redisUtils);
    }

    //商品索引
    @Override
    public void indexDoc(IndexWriter writer, IndexWriter indexDir, Goods goods) throws Exception {
        Document document = new Document();
        Field field = new TextField("goodsName", goods.getGoodsName(), Field.Store.YES);
        field.setBoost(1.3F);//标题权重比较大
        document.add(field);
        document.add(new Field("goodsId", String.valueOf(goods.getGoodsId()), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new TextField("goodsIntroduction", goods.getGoodsIntroduction(), Field.Store.YES));
        document.add(new Field("goodsPrice", String.valueOf(goods.getGoodsPrice()), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("goodsType", goods.getGoodsType(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("goodsTarget", goods.getGoodsTarget(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("goodsPicture", goods.getGoodsPicture(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("goodsSuccesscount", String.valueOf(goods.getGoodsSuccesscount()), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        indexDir.addDocument(document);
    }


    //索引搜索
    @Override
    public List<Goods> indexSearch(Highlighter highlighter, TopDocs hits, IndexSearcher indexSearcher, IKAnalyzer6x ikAnalyzer6x) throws Exception {
        List<Goods> goodsList = new LinkedList<>();
        if (hits == null && hits.totalHits == 0) return null;
        for (ScoreDoc scoreDoc : hits.scoreDocs) {
            Document document = indexSearcher.doc(scoreDoc.doc);
            Goods goods = new Goods();
            goods.setGoodsId(Integer.valueOf(document.get("goodsId")));
            goods.setGoodsPrice(Integer.valueOf(document.get("goodsPrice")));
            goods.setGoodsType(document.get("goodsType"));
            goods.setGoodsIntroduction(document.get("goodsIntroduction"));
            goods.setGoodsPicture(document.get("goodsPicture"));
            goods.setGoodsTarget(document.get("goodsTarget"));
            goods.setGoodsSuccesscount(Integer.valueOf(document.get("goodsSuccesscount")));
            String goodsName = document.get("goodsName");
            String goodsName1 = null;
            if (goodsName != null && !goodsName.equals("")) {
                TokenStream tokenStream = ikAnalyzer6x.tokenStream("goodsName", new StringReader(goodsName));
                goodsName1 = highlighter.getBestFragment(tokenStream, goodsName);
            }
            if(goodsName1 != null){
                goods.setGoodsName(goodsName1);
            }else{
                goods.setGoodsName(goodsName);
            }
            goodsList.add(goods);
        }
        return goodsList;
    }
}
