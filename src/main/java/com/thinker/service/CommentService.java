package com.thinker.service;

import java.util.Map;

/**
 * Created by hao on 17/5/12.
 */
public interface CommentService {

    Map<String,Object> addComment(String commentContent, int userId, int goodsId);

    void deleteComment(int commentId);
}
