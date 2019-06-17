package com.thinker.search;

import com.thinker.domain.University;
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
import java.util.ArrayList;
import java.util.List;

/**
 * Created by hao on 17/5/14.
 */
public class UniversityIndex extends BaseIndex<University> {

    public UniversityIndex() {
        super();
    }

    public UniversityIndex(RedisUtils<University> redisUtils){
        super(redisUtils);
    }


    //添加学校索引
    @Override
    public void indexDoc(IndexWriter writer, IndexWriter indexDir, University university) throws Exception {
        Document document = new Document();
        Field field = new TextField("universityName", university.getUniversityName(), Field.Store.YES);
        field.setBoost(1.3f);//权重
        document.add(field);
        document.add(new Field("universityId", String.valueOf(university.getUniversityId()), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new TextField("universityIntroduction", university.getUniversityDescription(), Field.Store.YES));
        document.add(new Field("universityEnname", university.getUniversityEnname(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("universityLogo", university.getUniversityLogo(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        document.add(new Field("universityState", university.getUniversityState(), new FieldType(FieldType.YES, FieldType.NO, FieldType.NONE)));
        indexDir.addDocument(document);
    }

    //根据索引搜索
    @Override
    public List<University> indexSearch(Highlighter highlighter, TopDocs hits, IndexSearcher indexSearcher, IKAnalyzer6x ikAnalyzer6x) throws Exception {
        List<University> universityList=new ArrayList<>();
        if (hits==null&&hits.totalHits==0)return null;
        for (ScoreDoc scoreDoc:hits.scoreDocs){
            Document document=indexSearcher.doc(scoreDoc.doc);
            University university=new University();
            university.setUniversityId(Integer.valueOf(document.get("universityId")));
            university.setUniversityDescription(document.get("universityIntroduction"));
            university.setUniversityEnname(document.get("universityEnname"));
            university.setUniversityLogo(document.get("universityLogo"));
            university.setUniversityState(document.get("universityState"));
            String universityName=document.get("universityName");
            String universityName1=null;
            if (universityName!=null&&!universityName.equals("")){
                TokenStream tokenStream=ikAnalyzer6x.tokenStream("universityName",new StringReader(universityName));
                universityName1=highlighter.getBestFragment(tokenStream,universityName);
            }
            if (universityName1!=null){
                university.setUniversityName(universityName1);
            }else {
                university.setUniversityName(universityName);
            }
            universityList.add(university);

        }
        return universityList;
    }
}
