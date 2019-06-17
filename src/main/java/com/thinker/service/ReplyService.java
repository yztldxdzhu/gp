package com.thinker.service;

import com.thinker.domain.Reply;

import java.util.List;

/**
 * Created by mgh on 2017/4/18.
 */
public interface ReplyService {

    void addReply(int questionId,int expertId, String replyContent);

    void deleteReply(int replyId);

    List<Reply> showAllReplyByQuestion(Integer questionId);

}
