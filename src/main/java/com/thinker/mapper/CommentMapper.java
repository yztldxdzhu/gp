package com.thinker.mapper;

import com.thinker.domain.Comment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by hao on 17/5/12.
 */
@Component
public interface CommentMapper {

    void insertComment(@Param(value = "commentContent") String commentContent, @Param(value = "userId") int userId, @Param(value = "goodsId") int goodsId);

    void deleteComment(int commentId);

    List<Comment> selectAllCommentByGoodsId(int goodsId);

}
