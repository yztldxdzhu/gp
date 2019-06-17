package com.thinker.domain;

import com.thinker.dto.QuestionUser;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
public class Question implements Serializable {

    private int questionId;

    private Date questionTime;   //提问时间

    private String questionContent;   //提问内容

    private int questionIspassed;  //审核问题是否通过，0表示未审核，1表示审核通过，2表示审核未通过

    private int userId;

    private int tagId;

    private List<Reply> replyList;

    private QuestionUser questionUser;

    public void setQuestionIspassed(int questionIspassed){
        this.questionIspassed = questionIspassed;
    }

    public int getQuestionIspassed(){
        return questionIspassed;
    }

    public List<Reply> getReplyList(){
        return replyList;
    }

    public void setReplyList(List<Reply> replyList){
        this.replyList = replyList;
    }

    public QuestionUser getQuestionUser() {
        return questionUser;
    }

    public void setQuestionUser(QuestionUser questionUser) {
        this.questionUser = questionUser;
    }

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public Date getQuestionTime() {
        return questionTime;
    }

    public void setQuestionTime(Date questionTime) {
        this.questionTime = questionTime;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

}
