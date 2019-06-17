package com.thinker.domain;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by LJ on 2017/5/11.
 */
public class Goods implements Serializable{

    private int goodsId;

    private String goodsName;   //商品名称

    private int goodsPrice;   //商品价格

    private String goodsType;   //商品类型

    private String goodsTarget;   //商品的目标群众，如高中，大学，研究生

    private String goodsIntroduction;   //商品简介

    private int goodsSuccesscount;   //商品购买成功总数

    private int goodsStatus;   //商品审核状态，0未通过，1表示通过

    private String goodsPicture;   //商品图片

    private Timestamp goodsTime;   //商品添加更新时间

    private int warehouseId;   //仓库ID

    private int goodsStock;   //库存量

    private String goodsNumber;   //商品编码

    private int goodssortId;   //商品类别ID

    private int commentCount;  //商品评论数量

    private List<Comment> commentList;

    private List<Score> scoreList;

    private MultipartFile goodsPictureContent;   //商品图片数据流

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public List<Score> getScoreList() {
        return scoreList;
    }

    public void setScoreList(List<Score> scoreList) {
        this.scoreList = scoreList;
    }

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    public int getGoodsStock() {
        return goodsStock;
    }

    public void setGoodsStock(int goodsStock) {
        this.goodsStock = goodsStock;
    }

    public String getGoodsNumber() {
        return goodsNumber;
    }

    public void setGoodsNumber(String goodsNumber) {
        this.goodsNumber = goodsNumber;
    }

    public int getGoodssortId() {
        return goodssortId;
    }

    public void setGoodssortId(int goodssortId) {
        this.goodssortId = goodssortId;
    }

    public Timestamp getGoodsTime(){
        return goodsTime;
    }

    public void setGoodsTime(Timestamp goodsTime){
        this.goodsTime = goodsTime;
    }

    public String getGoodsPicture() {
        return goodsPicture;
    }

    public void setGoodsPicture(String goodsPicture) {
        this.goodsPicture = goodsPicture;
    }

    public MultipartFile getGoodsPictureContent() {
        return goodsPictureContent;
    }

    public void setGoodsPictureContent(MultipartFile goodsPictureContent) {
        this.goodsPictureContent = goodsPictureContent;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public int getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(int goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public String getGoodsType() {
        return goodsType;
    }

    public void setGoodsType(String goodsType) {
        this.goodsType = goodsType;
    }

    public String getGoodsTarget() {
        return goodsTarget;
    }

    public void setGoodsTarget(String goodsTarget) {
        this.goodsTarget = goodsTarget;
    }

    public String getGoodsIntroduction() {
        return goodsIntroduction;
    }

    public void setGoodsIntroduction(String goodsIntroduction) {
        this.goodsIntroduction = goodsIntroduction;
    }

    public int getGoodsSuccesscount() {
        return goodsSuccesscount;
    }

    public void setGoodsSuccesscount(int goodsSuccesscount) {
        this.goodsSuccesscount = goodsSuccesscount;
    }

    public int getGoodsStatus() {
        return goodsStatus;
    }

    public void setGoodsStatus(int goodsStatus) {
        this.goodsStatus = goodsStatus;
    }
}
