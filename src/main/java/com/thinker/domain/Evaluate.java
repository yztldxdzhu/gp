package com.thinker.domain;

import java.util.List;

public class Evaluate {

    private Integer evaluateId;

    private String evaluateEducation;   //当前学历

    private String evaluateCampus;   //当前学校

    private String evaluateCollege;   //当前学院

    private String evaluateMajor;   //当前专业

    private Double evaluateGpa;   //你的GPA

    private Integer evaluateScore;   //平均成绩

    private String evaluateTarget;   //目标，如高中，本科，研究生

    private List<Evaluateresult> evaluateresultList;   //评估结果列表

    private Integer userId;

    public List<Evaluateresult> getEvaluateresultList() {
        return evaluateresultList;
    }

    public void setEvaluateresultList(List<Evaluateresult> evaluateresultList) {
        this.evaluateresultList = evaluateresultList;
    }

    public String getEvaluateEducation() {
        return evaluateEducation;
    }

    public void setEvaluateEducation(String evaluateEducation) {
        this.evaluateEducation = evaluateEducation;
    }

    public String getEvaluateCampus() {
        return evaluateCampus;
    }

    public void setEvaluateCampus(String evaluateCampus) {
        this.evaluateCampus = evaluateCampus;
    }

    public String getEvaluateCollege() {
        return evaluateCollege;
    }

    public void setEvaluateCollege(String evaluateCollege) {
        this.evaluateCollege = evaluateCollege;
    }

    public String getEvaluateMajor() {
        return evaluateMajor;
    }

    public void setEvaluateMajor(String evaluateMajor) {
        this.evaluateMajor = evaluateMajor;
    }

    public Double getEvaluateGpa() {
        return evaluateGpa;
    }

    public void setEvaluateGpa(Double evaluateGpa) {
        this.evaluateGpa = evaluateGpa;
    }

    public Integer getEvaluateScore() {
        return evaluateScore;
    }

    public void setEvaluateScore(Integer evaluateScore) {
        this.evaluateScore = evaluateScore;
    }

    public String getEvaluateTarget() {
        return evaluateTarget;
    }

    public void setEvaluateTarget(String evaluateTarget) {
        this.evaluateTarget = evaluateTarget;
    }

    public Integer getEvaluateId() {
        return evaluateId;
    }

    public void setEvaluateId(Integer evaluateId) {
        this.evaluateId = evaluateId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}