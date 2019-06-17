package com.thinker.domain;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

public class University implements Serializable{

    private int universityId;

    private String universityName;   //大学中文名

    private String universityEnname;   //大学英文名

    private String universityLocation;   //大学详细地址

    private String universityState;   //大学所在州

    private String universityLogo;   //大学Logo

    private String universityVideo;   //大学视频

    private String universityUrl;   //大学的超链接

    private String universityDescription;   //大学简介

    private String universityProperty;  //学校属性

    private String universityApplicationrule;  //大学申请条件

    private MultipartFile universityLogoContent;   //大学logo数据流

    private List<College> collegeList;

    private List<Universitypicture> universitypictureList;

    public void setUniversitypictureList(List<Universitypicture> universitypictureList){
        this.universitypictureList = universitypictureList;
    }

    public List<Universitypicture> getUniversitypictureList(){
        return universitypictureList;
    }

    public List<College> getCollegeList() {
        return collegeList;
    }

    public void setCollegeList(List<College> collegeList) {
        this.collegeList = collegeList;
    }

    public String getUniversityProperty() {
        return universityProperty;
    }

    public void setUniversityProperty(String universityProperty) {
        this.universityProperty = universityProperty;
    }

    public String getUniversityVideo() {
        return universityVideo;
    }

    public void setUniversityVideo(String universityVideo) {
        this.universityVideo = universityVideo;
    }

    public String getUniversityLocation() {
        return universityLocation;
    }

    public void setUniversityLocation(String universityLocation) {
        this.universityLocation = universityLocation;
    }

    public String getUniversityState() {
        return universityState;
    }

    public void setUniversityState(String universityState) {
        this.universityState = universityState;
    }

    public int getUniversityId() {
        return universityId;
    }

    public void setUniversityId(int universityId) {
        this.universityId = universityId;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getUniversityEnname() {
        return universityEnname;
    }

    public void setUniversityEnname(String universityEnname) {
        this.universityEnname = universityEnname;
    }

    public String getUniversityLogo() {
        return universityLogo;
    }

    public void setUniversityLogo(String universityLogo) {
        this.universityLogo = universityLogo;
    }

    public String getUniversityUrl() {
        return universityUrl;
    }

    public void setUniversityUrl(String universityUrl) {
        this.universityUrl = universityUrl;
    }

    public String getUniversityDescription() {
        return universityDescription;
    }

    public void setUniversityDescription(String universityDescription) {
        this.universityDescription = universityDescription;
    }

    public MultipartFile getUniversityLogoContent() {
        return universityLogoContent;
    }

    public void setUniversityLogoContent(MultipartFile universityLogoContent) {
        this.universityLogoContent = universityLogoContent;
    }

    public String getUniversityApplicationrule() {
        return universityApplicationrule;
    }

    public void setUniversityApplicationrule(String universityApplicationrule) {
        this.universityApplicationrule = universityApplicationrule;
    }
}