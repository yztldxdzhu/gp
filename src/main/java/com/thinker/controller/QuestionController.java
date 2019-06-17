package com.thinker.controller;

import com.thinker.domain.Question;
import com.thinker.domain.User;
import com.thinker.service.QuestionService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 问题管理
 * Created by yhh on 017/4/24.
 */
@Controller
@RequestMapping(value = "/question")
public class QuestionController extends BaseController {
    @Autowired
    private QuestionService questionService;


    //我要提问
    @RequestMapping(value = "/setQuestion")
    @ResponseBody
    public Map<String, Object> setQuestion(@RequestParam(value="tagId") Integer tagId, @RequestParam(value="questionContent") String questionContent) {
        Map<String, Object> map = new HashMap<>();
        User user = SessionUtil.getCurrentUser();
        int userId = user.getUserId();
        questionService.insertQuestion(userId, tagId, questionContent);
        map.put("success", true);
        map.put("msg", "提问成功");
        return map;
    }

    //根据用户查询留言问题
    @RequestMapping(value = "/userQuestionGet")
    @ResponseBody
    public Map<String, Object> findQuestion() {
        Map<String, Object> map = new HashMap<>();
        User user = SessionUtil.getCurrentUser();
        int userId = user.getUserId();
        List<Question> userQuestionList = questionService.findQuestionByUserId(userId);
        map.put("userQuestionList", userQuestionList);
        return map;
    }

    //删除留言问题
    @RequestMapping(value = "/deleteQuestion")
    @ResponseBody
    public Map<String, Object> deleteQuestion(@RequestParam Integer questionId) {
        Map<String, Object> map = new HashMap<>();
        questionService.deleteQuestion(questionId);
        map.put("msg", "删除问题");
        map.put("success", true);
        return map;
    }

    //查看同一标签所有问题
    @RequestMapping(value = "/findAllQuestionByTag")
    @ResponseBody
    public Map<String, Object> findAllQuestionByTagId(@RequestParam(value="tagId") Integer tagId) {
        Map<String, Object> map = new HashMap<>();
        List<Question> questionListByTagId = questionService.findAllQuestionByTagId(tagId);
        map.put("msg", questionListByTagId);
        map.put("success", true);
        return map;
    }

    //查看所有问题
    @RequestMapping(value = "/findAllQuestion")
    @ResponseBody
    public Map<String, Object> findAllQuestion() {
        Map<String,Object> map=new HashMap<>();
        List<Question> noPassedQuestionList = new ArrayList<>();
        List<Question> passedQuestionList = new ArrayList<>();
        List<Question> noVerifyQuestionList = new ArrayList<>();
        List<Question> questionAllList=questionService.findAllQuestion();
        for(Question question:questionAllList){
            if(question.getQuestionIspassed() == 0 ){
                noVerifyQuestionList.add(question);
            }else if(question.getQuestionIspassed() == 1){
                passedQuestionList.add(question);
            }else{
                noPassedQuestionList.add(question);
            }
        }
        map.put("noPassedQuestionList",noPassedQuestionList);
        map.put("passedQuestionList",passedQuestionList);
        map.put("noVerifyQuestionList",noVerifyQuestionList);
        map.put("success",true);
        return map;
    }

    //查看所有通过审核的问题
    @RequestMapping(value = "/findAllPassedQuestion")
    @ResponseBody
    public Map<String, Object> findAllPassedQuestion() {
        List<Question> passedQuestionList = questionService.findAllPassedQuestion();
        return MsgGenerate.bindMapMsg("passedQuestionList",passedQuestionList);
    }

    //查找10个最新的问题
    @RequestMapping(value = "/findNewQuestion")
    @ResponseBody
    public Map<String, Object> findNewQuestion() {
        List<Question> newQuestionList = questionService.findNewQuestion();
        return MsgGenerate.bindMapMsg("newQuestionList",newQuestionList);
    }

    //审核用户提问问题
    @RequestMapping(value = "/verifyQuestion")
    @ResponseBody
    public Map<String, Object> verifyQuestion(@RequestParam Integer questionId,@RequestParam Integer questionIspassed) {
        Map<String, Object> map = new HashMap<>();
        questionService.verifyQuestion(questionId, questionIspassed);
        map.put("msg", "操作成功！");
        map.put("success", true);
        return map;
    }
}
