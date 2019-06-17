package com.thinker.search.util;


import com.thinker.util.exception.MessageException;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.index.*;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

/**
 * 设置索引合并策略
 * Created by Asus on 2017/1/13.
 */
public class IndexUtil {

    private static IndexSearcher indexSearcher;

    public static IndexWriter getIndexWriter(String indexPath, boolean create) {
        try {
            File file = new File(indexPath);//单目录索引创建
            if (!file.exists()) {
                file.mkdirs();
            }
            Directory dir = FSDirectory.open(Paths.get(indexPath, new String[0]));
            Analyzer analyzer = new IKAnalyzer6x();
            IndexWriterConfig iwc = new IndexWriterConfig(analyzer);
            LogMergePolicy mergePolicy = new LogByteSizeMergePolicy();

            //=======================以下是对创建索引的优化==============================

            /**设置segment合并的频率，默认是10**/
            mergePolicy.setMergeFactor(10);

            /**设置写入一个新的segment内存中的doc数目，默认是10**/
            iwc.setMaxBufferedDocs(10);

            /**设置写入一个新的segment内存中的最大容量**/
            iwc.setRAMBufferSizeMB(100);

            iwc.setMergePolicy(mergePolicy);
            IndexWriter writer = new IndexWriter(dir, iwc);
            return writer;
        } catch (IOException e) {
            e.printStackTrace();
            throw new MessageException("写入索引文件失败！");
        }
    }


    /**
     * 先将索引放置在内存中，当达到一定数量的时候再批量写进磁盘中，减少磁盘IO操作
     *
     * @return
     * @throws IOException
     */
    public static IndexWriter getIndexDir() {
        try {
            RAMDirectory ramDir = new RAMDirectory();
            Analyzer analyzer = new IKAnalyzer6x();
            IndexWriterConfig iwc = new IndexWriterConfig(analyzer);
            IndexWriter writer = new IndexWriter(ramDir, iwc);
            return writer;
        } catch (IOException e) {
            e.printStackTrace();
            throw new MessageException("写入缓存索引失败！");
        }
    }


    /**
     * 对indexsearch进行缓存，通过在查询中复用可以大幅度提高搜索效率，因为每次打开都会加载所有的索引，影响性能，缓存后等于对查询进行了预热。
     *
     * @param indexPath
     * @return
     * @throws IOException
     */
    public static IndexSearcher getIndexSearch(String indexPath) throws IOException {
        if (indexSearcher != null) {
            IndexReader reader = indexSearcher.getIndexReader();
            IndexReader newReader = DirectoryReader.openIfChanged((DirectoryReader) reader);
            if (newReader == null) return indexSearcher;
            indexSearcher = new IndexSearcher(newReader);
        } else {
            Directory dir = FSDirectory.open(Paths.get(indexPath, new String[0]));
            indexSearcher = new IndexSearcher(DirectoryReader.open(dir));
        }
        return indexSearcher;
    }
}
