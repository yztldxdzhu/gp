package com.thinker.domain;


import java.util.List;

public class User {

    private Integer userId;

    private String userTel;   //电话

    private String userPwd;   //密码

    private String userName;   //用户名

    private String userAge;   //年龄

    private String userSex;   //性别

    private String userNickname;   //昵称

    private String userCampus;   //用户所在学校

    private String userMajor;   //专业

    private String userEducation;   //学历

    private String userEmail;   //邮箱

    private String userLocation;   //用户所在地

    private Double userGpa;   //用户GPA

    private int userType;   //用户类型，0表示用户，1表示管理员

    private String userHeadPicture;   //头像

    private int expertId;

    private List<Application> applicationList;

    public List<Application> getApplicationList() {
        return applicationList;
    }

    public void setApplicationList(List<Application> applicationList) {
        this.applicationList = applicationList;
    }

    public String getUserAge() {
        return userAge;
    }

    public void setUserAge(String userAge) {
        this.userAge = userAge;
    }

    public String getUserSex() {
        return userSex;
    }

    public void setUserSex(String userSex) {
        this.userSex = userSex;
    }

    public int getExpertId() {
        return expertId;
    }

    public void setExpertId(int expertId) {
        this.expertId = expertId;
    }

    public String getUserHeadPicture() {
        return userHeadPicture;
    }

    public void setUserHeadPicture(String userHeadPicture) {
        this.userHeadPicture = userHeadPicture;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel == null ? null : userTel.trim();
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname == null ? null : userNickname.trim();
    }

    public String getUserCampus() {
        return userCampus;
    }

    public void setUserCampus(String userCampus) {
        this.userCampus = userCampus == null ? null : userCampus.trim();
    }

    public String getUserMajor() {
        return userMajor;
    }

    public void setUserMajor(String userMajor) {
        this.userMajor = userMajor == null ? null : userMajor.trim();
    }

    public String getUserEducation() {
        return userEducation;
    }

    public void setUserEducation(String userEducation) {
        this.userEducation = userEducation == null ? null : userEducation.trim();
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    public String getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(String userLocation) {
        this.userLocation = userLocation == null ? null : userLocation.trim();
    }

    public Double getUserGpa() {
        return userGpa;
    }

    public void setUserGpa(Double userGpa) {
        this.userGpa = userGpa;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }
}