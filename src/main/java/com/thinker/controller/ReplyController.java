package com.thinker.controller;

import com.thinker.domain.Expert;
import com.thinker.domain.Reply;
import com.thinker.service.ReplyService;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hao on 17/5/18.
 */
@Controller
@RequestMapping(value = "/reply")
public class ReplyController extends BaseController {

    @Autowired
    private ReplyService replyService;

    //添加回复
    @RequestMapping(value = "/addReply")
    @ResponseBody
    public Map<String, Object> addReply(@RequestParam Integer questionId, @RequestParam String replyContent) {
        Expert expert = SessionUtil.getCurrentExpert();
        int expertId=expert.getExpertId();
        replyService.addReply(questionId, expertId, replyContent);
        return generateSuccessMsg("回复成功");
    }

    //删除回复
    @RequestMapping(value = "/deleteReply")
    @ResponseBody
    public Map<String, Object> deleteReply(@RequestParam Integer replyId) {
        replyService.deleteReply(replyId);
        return generateSuccessMsg("删除回复成功");
    }

    //根据问题显示所有回复
    @RequestMapping(value = "showAllReplyByQuestion")
    @ResponseBody
    public Map<String, Object> showAllReplyByQuestion(@RequestParam Integer questionId) {
        Map<String, Object> map = new HashMap<>();
        List<Reply> replyList = replyService.showAllReplyByQuestion(questionId);
        map.put("replyList", replyList);
        map.put("success", true);
        return map;
    }
}
