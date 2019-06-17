package com.thinker.controller;

import com.thinker.domain.User;
import com.thinker.service.CommentService;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * 评论管理
 * Created by hao on 17/5/12.
 */
@Controller
@RequestMapping(value = "/comment")
public class CommentController extends BaseController {

    @Autowired
    private CommentService commentService;

    //添加评论
    @RequestMapping(value = "/addComment")
    @ResponseBody
    public Map<String, Object> addComment(@RequestParam String commentContent, @RequestParam Integer goodsId) {
        User user = SessionUtil.getCurrentUser();
        int userId = user.getUserId();
        return commentService.addComment(commentContent, userId, goodsId);
    }

    //删除评论
    @RequestMapping(value = "/deleteComment")
    @ResponseBody
    public Map<String, Object> deleteComment(@RequestParam Integer commentId) {
        commentService.deleteComment(commentId);
        return generateSuccessMsg("删除评论成功");
    }
}
