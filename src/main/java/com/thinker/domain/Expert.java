package com.thinker.domain;

import java.util.List;

public class Expert {

    private Integer expertId;

    private String expertName;//顾问名称

    private Integer expertSex;//顾问性别

    private Integer expertAge;//顾问年龄

    private String expertEducation;//顾问学历

    private String expertNickname;//顾问昵称

    private String expertEmail;//电子邮件

    private String expertCampus;//大学

    private String expertCollege;//大学

    private String expertMajor;//大学

    private String expertLocation;//顾问地址

    private Integer expertAbroadyear;//顾问留洋时间

    private Integer expertStatus;//顾问状态

    private String expertAbroadexp;//顾问经历

    private String expertTel;//顾问电话

    private String expertPwd;//顾问密码

    private String expertHeadPicture;//顾问图像

    private List<Tag> tagList;//顾问类别

    private String tagString;

    public Integer getExpertSex() {
        return expertSex;
    }

    public void setExpertSex(Integer expertSex) {
        this.expertSex = expertSex;
    }

    public Integer getExpertAge() {
        return expertAge;
    }

    public void setExpertAge(Integer expertAge) {
        this.expertAge = expertAge;
    }

    public String getTagString() {
        return tagString;
    }

    public void setTagString(String tagString) {
        this.tagString = tagString;
    }

    public List<Tag> getTagList() {
        return tagList;
    }

    public void setTagList(List<Tag> tagList) {
        this.tagList = tagList;
    }

    public String getExpertNickname() {
        return expertNickname;
    }

    public void setExpertNickname(String expertNickname) {
        this.expertNickname = expertNickname;
    }

    public String getExpertEmail() {
        return expertEmail;
    }

    public void setExpertEmail(String expertEmail) {
        this.expertEmail = expertEmail;
    }

    public String getExpertCampus() {
        return expertCampus;
    }

    public void setExpertCampus(String expertCampus) {
        this.expertCampus = expertCampus;
    }

    public String getExpertCollege() {
        return expertCollege;
    }

    public void setExpertCollege(String expertCollege) {
        this.expertCollege = expertCollege;
    }

    public String getExpertMajor() {
        return expertMajor;
    }

    public void setExpertMajor(String expertMajor) {
        this.expertMajor = expertMajor;
    }

    public Integer getExpertId() {
        return expertId;
    }

    public void setExpertId(Integer expertId) {
        this.expertId = expertId;
    }

    public String getExpertName() {
        return expertName;
    }

    public void setExpertName(String expertName) {
        this.expertName = expertName;
    }

    public String getExpertEducation() {
        return expertEducation;
    }

    public void setExpertEducation(String expertEducation) {
        this.expertEducation = expertEducation;
    }

    public String getExpertLocation() {
        return expertLocation;
    }

    public void setExpertLocation(String expertLocation) {
        this.expertLocation = expertLocation;
    }

    public Integer getExpertAbroadyear() {
        return expertAbroadyear;
    }

    public void setExpertAbroadyear(Integer expertAbroadyear) {
        this.expertAbroadyear = expertAbroadyear;
    }

    public Integer getExpertStatus() {
        return expertStatus;
    }

    public void setExpertStatus(Integer expertStatus) {
        this.expertStatus = expertStatus;
    }

    public String getExpertAbroadexp() {
        return expertAbroadexp;
    }

    public void setExpertAbroadexp(String expertAbroadexp) {
        this.expertAbroadexp = expertAbroadexp;
    }

    public String getExpertTel() {
        return expertTel;
    }

    public void setExpertTel(String expertTel) {
        this.expertTel = expertTel;
    }

    public String getExpertPwd() {
        return expertPwd;
    }

    public void setExpertPwd(String expertPwd) {
        this.expertPwd = expertPwd;
    }

    public String getExpertHeadPicture() {
        return expertHeadPicture;
    }

    public void setExpertHeadPicture(String expertHeadPicture) {
        this.expertHeadPicture = expertHeadPicture;
    }
}