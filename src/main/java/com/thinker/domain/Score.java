package com.thinker.domain;

/**
 * Created by LJ on 2017/5/11.
 */
public class Score {

    private int scoreId;

    private double scoreService;   //商品服务态度评分

    private double scoreMajor;    //商品专业程度评分

    private double scoreServiceTime;   //对商品服务时间评分

    private double scoreAll;   //用户对商品的综合评分

    private int goodsId;

    private int userId;

    public int getScoreId() {
        return scoreId;
    }

    public void setScoreId(int scoreId) {
        this.scoreId = scoreId;
    }

    public double getScoreService() {
        return scoreService;
    }

    public void setScoreService(double scoreService) {
        this.scoreService = scoreService;
    }

    public double getScoreMajor() {
        return scoreMajor;
    }

    public void setScoreMajor(double scoreMajor) {
        this.scoreMajor = scoreMajor;
    }

    public double getScoreServiceTime() {
        return scoreServiceTime;
    }

    public void setScoreServiceTime(double scoreServiceTime) {
        this.scoreServiceTime = scoreServiceTime;
    }

    public double getScoreAll() {
        return scoreAll;
    }

    public void setScoreAll(double scoreAll) {
        this.scoreAll = scoreAll;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
