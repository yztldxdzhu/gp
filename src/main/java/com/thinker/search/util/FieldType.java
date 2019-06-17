package com.thinker.search.util;

import org.apache.lucene.index.IndexOptions;

/**
 * Created by Asus on 2017/1/13.
 */
public class FieldType extends org.apache.lucene.document.FieldType {
    public static boolean YES = true;
    public static boolean NO = false;
    public static IndexOptions NONE = IndexOptions.NONE;
    public static IndexOptions DOCS_AND_FREQS_AND_POSITIONS = IndexOptions.DOCS_AND_FREQS_AND_POSITIONS;

    private boolean store;
    private boolean tokenize;

    public boolean isStore() {
        return store;
    }

    public void setStore(boolean store) {
        this.store = store;
    }

    public boolean isTokenize() {
        return tokenize;
    }

    public void setTokenize(boolean tokenize) {
        this.tokenize = tokenize;
    }

    public FieldType(boolean store, boolean tokenize, IndexOptions indexOptions) {
        super();
        super.setStored(store);
        super.setTokenized(tokenize);
        super.setIndexOptions(indexOptions);
        super.freeze();
    }
}
