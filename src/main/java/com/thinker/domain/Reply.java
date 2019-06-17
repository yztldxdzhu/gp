package com.thinker.domain;

import com.thinker.dto.ReplyExpert;

import java.io.Serializable;
import java.sql.Date;

/**
 * Created by LJ on 2017/5/23.
 */
public class Reply implements Serializable{

    private int replyId;

    private String replyContent;

    private int questionId;

    private int expertId;

    private Date replyTime;

    private ReplyExpert replyExpert;

    public ReplyExpert getReplyExpert(){
        return replyExpert;
    }

    public void setReplyExpert(ReplyExpert replyExpert){
        this.replyExpert = replyExpert;
    }

    public int getReplyId() {
        return replyId;
    }

    public void setReplyId(int replyId) {
        this.replyId = replyId;
    }

    public String getReplyContent() {
        return replyContent;
    }

    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public int getExpertId() {
        return expertId;
    }

    public void setExpertId(int expertId) {
        this.expertId = expertId;
    }

    public Date getReplyTime() {
        return replyTime;
    }

    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
    }
}
