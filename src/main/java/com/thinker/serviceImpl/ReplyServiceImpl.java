package com.thinker.serviceImpl;

import com.thinker.domain.Reply;
import com.thinker.mapper.ReplyMapper;
import com.thinker.service.ReplyService;
import com.thinker.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    //添加回复
    @Override
    public void addReply(int questionId,int expertId, String replyContent) {
        Date replyTime= DateUtil.getCurrentTime();
        replyMapper.insert(questionId,expertId,replyContent,replyTime);
    }

    //删除回复
    @Override
    public void deleteReply(int replyId) {
        replyMapper.deleteByReplyId(replyId);
    }

    //根据问题ID获得所有回复
    @Override
    public List<Reply> showAllReplyByQuestion(Integer questionId) {
        List<Reply> list=replyMapper.showAllReplyByQuestion(questionId);
        return list;
    }
}
