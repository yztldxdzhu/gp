package com.thinker.mapper;


import com.thinker.domain.Reply;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public interface ReplyMapper {

    int insert( @Param(value = "questionId") int questionId,@Param(value = "expertId")int expertId,
               @Param(value = "replyContent")String replyContent, @Param(value = "replyTime")Date replyTime );

    int deleteByReplyId(Integer replyId);

    List<Reply> selectReplyByQuestionId(int questionId);

    List<Reply> showAllReplyByQuestion(@Param(value = "questionId") Integer questionId);
}