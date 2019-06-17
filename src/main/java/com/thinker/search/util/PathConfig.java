package com.thinker.search.util;

import com.thinker.util.user.SessionUtil;

/**
 * 索引存入磁盘地址
 * Created by LJ on 2017/5/13.
 */
public class PathConfig {

    public static String getIndexPath(){
        return SessionUtil.getSession().getServletContext().getRealPath("/search/lucene6.3/");
    }
}
