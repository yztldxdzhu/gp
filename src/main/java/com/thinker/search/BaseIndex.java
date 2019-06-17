package com.thinker.search;

import com.thinker.domain.Goods;
import com.thinker.redis.RedisUtils;
import com.thinker.search.util.IKAnalyzer6x;
import com.thinker.search.util.IndexUtil;
import com.thinker.search.util.PathConfig;
import com.thinker.util.exception.MessageException;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * template模式（模板模式） 构造搜索抽象类，泛型 T 针对于不同搜索实体
 * Created by Asus on 2017/1/12.
 */
public abstract class BaseIndex<T> {

    /**
     * 父级索引路径
     */
    private static String parentIndexPath = PathConfig.getIndexPath();
    /**
     * 索引编写器
     */
    private static IndexWriter writer = IndexUtil.getIndexWriter(parentIndexPath, true);
    /**
     * 索引搜索器
     */
    private IndexSearcher indexSearcher;
    /**
     * 内存索引编辑器
     */
    private static IndexWriter indexDir = IndexUtil.getIndexDir();
    /**
     * 缓存
     */
    private RedisUtils<T> redisUtils;

    /**
     * 对象列表
     */
    public BaseIndex(){
        super();
    }
    public BaseIndex(RedisUtils<T> redisUtils) {
        super();
        try {
            this.indexSearcher = IndexUtil.getIndexSearch(parentIndexPath);
            this.redisUtils = redisUtils;
        } catch (IOException e) {
            e.printStackTrace();
            throw new MessageException("搜索失败！");
        }
    }

    static {
        BaseIndex.getInstance().start();
        System.out.println(parentIndexPath);
    }

    /**
     * 通过静态内部类构造单例模式
     *
     * @return
     */
    public static IndexCommitThread getInstance() {
        return IndexCommitThread.instance;
    }

    /**
     * 创建索引
     *
     * @param writer
     * @param t
     * @throws Exception
     */
    public abstract void indexDoc(IndexWriter writer, IndexWriter indexDir, T t) throws Exception;

    public abstract List<T> indexSearch(Highlighter highlighter, TopDocs hits, IndexSearcher indexSearcher, IKAnalyzer6x ikAnalyzer6x
    ) throws Exception;


    public void indexDocs(List<T> t) throws Exception {
        for (T t1 : t) {
            indexDoc(writer, indexDir, t1);
        }
    }

    public void indexDoc(T t) throws Exception {
        indexDoc(writer, indexDir, t);
    }

    public List<T> searchGoods(String index) throws Exception {
        String searchOption1 = "goodsName";
        String searchOption2 = "goodsIntroduction";
        return searchDoc(index,searchOption1,searchOption2);
    }

    public List<T> searchUniversity(String index) throws Exception {
        String searchOption1 = "universityName";
        String searchOption2 = "universityIntroduction";
        return searchDoc(index,searchOption1,searchOption2);
    }

    public List<T> searchGoodsByPage(String index,int pageNow,int pageSize) throws Exception {
        List<T> goodsList = searchGoods(index);
        return searchDocByPage(goodsList,index,pageNow,pageSize);
    }

    public List<T> searchUniversityByPage(String index,int pageNow,int pageSize) throws Exception {
        List<T> goodsList = searchGoods(index);
        return searchDocByPage(goodsList,index,pageNow,pageSize);
    }

    //根据关键词搜索
    public List<T> searchDoc(String index,String searchOption1,String searchOption2) throws Exception {
        BooleanQuery.Builder booleanQuery = new BooleanQuery.Builder();
        IKAnalyzer6x analyzer6x = new IKAnalyzer6x();
        QueryParser parser = new QueryParser(searchOption1, analyzer6x);
        Query query = parser.parse(index);
        QueryParser parser2 = new QueryParser(searchOption2, analyzer6x);
        Query query2 = parser2.parse(index);
        booleanQuery.add(query, BooleanClause.Occur.SHOULD);
        booleanQuery.add(query2, BooleanClause.Occur.SHOULD);
        TopDocs hits = this.indexSearcher.search(booleanQuery.build(), 100);
        QueryScorer scorer = new QueryScorer(query);
        /**
         * 这里可以由自己的需要自定义查找关键字高亮的样式
         */
        Fragmenter fragmenter = new SimpleSpanFragmenter(scorer);
        SimpleHTMLFormatter simpleHTMLFormatter = new SimpleHTMLFormatter("<b><font color='#ef7111'>", "</font></b>");
        Highlighter highlighter = new Highlighter(simpleHTMLFormatter, scorer);
        highlighter.setTextFragmenter(fragmenter);
        List<T> list = indexSearch(highlighter, hits, this.indexSearcher, analyzer6x);
        return list;
    }

    /**
     * 根据关键词分页搜索
     */
    public List<T> searchDocByPage(final List<T> listTotal,String index,int pageNow,int pageSize) throws Exception {
        int pageStart = (pageNow-1)*pageSize;
        int pageEnd = pageStart+pageSize;
        List<T> list = redisUtils.getRangeListOps(index,pageStart,pageEnd);
        if(list != null && list.size() != 0) return list;
        synchronized(""){
            list = redisUtils.getRangeListOps(index,pageNow,pageEnd);
            if(list != null && list.size() != 0) return list;
            final int listCount = listTotal.size();
            final int perThreadSize = 50;
            final int threadCount = listCount/perThreadSize +(listCount%perThreadSize ==0 ? 0 : 1);
            ExecutorService pool = Executors.newFixedThreadPool(threadCount);
            final CountDownLatch countDownLatch = new CountDownLatch(threadCount);
            for(int i=0;i<threadCount;i++){
                final int finalI = i;
                pool.execute(new Runnable() {
                    @Override
                    public void run() {
                        if(finalI < threadCount-1){
                            for(int k=0;k<perThreadSize;k++){
                                redisUtils.pushListOps(index,listTotal.get(finalI*perThreadSize+k));
                            }
                        }else{
                            for(int t=0;t<(listCount%perThreadSize == 0 ? perThreadSize : listCount%perThreadSize);t++){
                                redisUtils.pushListOps(index,listTotal.get(finalI*perThreadSize+t));
                            }
                        }
                        countDownLatch.countDown();
                    }
                }
                );
            }
            countDownLatch.await();
            redisUtils.setExpireTime(index,60,TimeUnit.SECONDS);
        }
        return redisUtils.getRangeListOps(index,pageStart,pageEnd);
    }

    /**
     * 开启独立线程，用于每60秒commit一次到磁盘索引库中
     */
    private static class IndexCommitThread extends Thread {
        private boolean flag;

        private static IndexCommitThread instance = new IndexCommitThread();

        @Override
        public void run() {
            flag = true;
            while (flag) {
                try {
                    if (indexDir.getDirectory().listAll().length > 0) {
                        indexDir.close();
                        writer.addIndexes(new Directory[]{indexDir.getDirectory()});
                        writer.close();
                        indexDir = IndexUtil.getIndexDir();
                        writer = IndexUtil.getIndexWriter(parentIndexPath, true);
                        System.out.println("我已开始运行！");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    flag = false;
                }
                try {
                    TimeUnit.SECONDS.sleep(60);//每隔60s添加一次索引文件到磁盘
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    if (!this.isAlive()) this.start();
                }
            }
        }
    }
}

