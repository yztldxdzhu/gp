package com.thinker.serviceImpl;

import com.thinker.domain.Question;
import com.thinker.domain.Reply;
import com.thinker.mapper.QuestionMapper;
import com.thinker.mapper.ReplyMapper;
import com.thinker.service.QuestionService;
import com.thinker.util.annotation.Intercept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

/**
 * Created by yhh on 2017/4/23.
 */
@Component
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionMapper questionMapper;

    @Autowired
    ReplyMapper replyMapper;

    //我要提问
    @Override
    public void insertQuestion(int userId, int tagId, String questionContent) {
        Question question=new Question();
        question.setQuestionTime(new Date());
        question.setTagId(tagId);
        question.setQuestionContent(questionContent);
        question.setUserId(userId);
        questionMapper.addQuestion(question);

    }

    //查询留言问题
    @Override
    public List<Question> findQuestionByUserId(int userId) {
        List<Question> questionList=questionMapper.getQuestionByUserId(userId);
        for(Question question:questionList){
            List<Reply> replyList = replyMapper.selectReplyByQuestionId(question.getQuestionId());
            if(replyList != null && replyList.size() != 0){
                question.setReplyList(replyList);
            }
        }
        return questionList;
    }

    //删除留言问题
    @Override
    public void deleteQuestion(int questionId) {
        questionMapper.removeQuestion(questionId);
    }

    //查看同一标签所有问题
    @Override
    public List<Question> findAllQuestionByTagId(int tagId) {
        List<Question> questionListByTagId=questionMapper.getAllQuestionByTagId(tagId);
        for(Question question:questionListByTagId){
            List<Reply> replyList = replyMapper.selectReplyByQuestionId(question.getQuestionId());
            if(replyList != null && replyList.size() != 0){
                question.setReplyList(replyList);
            }
        }
        return questionListByTagId;
    }

    //查看所有问题
    @Override
    public List<Question> findAllQuestion() {
        List<Question> questionAllList=questionMapper.getAllQuestion();
        for(Question question:questionAllList){
            List<Reply> replyList = replyMapper.selectReplyByQuestionId(question.getQuestionId());
            if(replyList != null && replyList.size() != 0){
                question.setReplyList(replyList);
            }
        }
        return questionAllList;
    }

    //查看十个最新问题
    @Intercept
    public List<Question> findNewQuestion() {
        List<Question> newQuestionList=questionMapper.getNewQuestion();
        for(Question question:newQuestionList){
            List<Reply> replyList = replyMapper.selectReplyByQuestionId(question.getQuestionId());
            if(replyList != null && replyList.size() != 0){
                question.setReplyList(replyList);
            }
        }
        return newQuestionList;
    }

    //查看所有审核通过的问题
    @Intercept
    public List<Question> findAllPassedQuestion() {
        List<Question> questionAllList=questionMapper.getAllPassedQuestion();
        for(Question question:questionAllList){
            List<Reply> replyList = replyMapper.selectReplyByQuestionId(question.getQuestionId());
            if(replyList != null && replyList.size() != 0){
                question.setReplyList(replyList);
            }
        }
        return questionAllList;
    }

    //问题审核
    @Override
    public void verifyQuestion(int questionId,int questionIspassed) {
        questionMapper.modifyQuestionIspassedByQuestionId(questionId,questionIspassed);
    }
}
