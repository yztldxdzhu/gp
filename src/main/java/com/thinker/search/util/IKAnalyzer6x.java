package com.thinker.search.util;

import org.apache.lucene.analysis.Analyzer;

/**
 * IKAnalyzer采用的是基于词典的正反向全切分算法，是基于lucene2.0版本API开发的
 * Created by Asus on 2017/1/11.
 */
public class IKAnalyzer6x extends Analyzer {
    private boolean userSmart;

    public boolean userSmart() {
        return this.userSmart;
    }

    public void setUserSmart(boolean userSmart) {
        this.userSmart = userSmart;
    }

    public IKAnalyzer6x(){
        this(false);
    }

    public IKAnalyzer6x(boolean userSmart){
        this.userSmart = userSmart;
    }

    @Override
    protected TokenStreamComponents createComponents(String s) {
        IKTokenizer6x ikTokenizer6x = new IKTokenizer6x(this.userSmart);
        return new TokenStreamComponents(ikTokenizer6x);
    }
}
