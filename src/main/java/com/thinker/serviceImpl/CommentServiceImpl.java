package com.thinker.serviceImpl;

import com.thinker.domain.Orderitem;
import com.thinker.mapper.CommentMapper;
import com.thinker.mapper.OrderMapper;
import com.thinker.service.CommentService;
import com.thinker.util.MsgGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by hao on 17/5/12.
 */
@Component
public class CommentServiceImpl implements CommentService {


    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Map<String,Object> addComment(String commentContent, int userId, int goodsId) {
        Orderitem orderitem = orderMapper.selectOrderitemByGoodsId(goodsId);
        if(orderitem.getOrderitemStatus() == 4){
            commentMapper.insertComment(commentContent, userId, goodsId);
            return MsgGenerate.getSuccessMap("评论成功！");
        }else{
            return MsgGenerate.getErrorMap("评论失败，请先确认收货谢谢！");
        }
    }

    @Override
    public void deleteComment(int commentId) {
        commentMapper.deleteComment(commentId);
    }
}
