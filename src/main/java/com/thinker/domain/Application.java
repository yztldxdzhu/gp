package com.thinker.domain;

import java.sql.Date;
import java.sql.Timestamp;

public class Application {
    private Integer applicationId;

    private String applicationCampus;  //申请学校

    private String applicationMajor;   //申请专业

    private String applicationCollege;   //申请学院

    private String applicationTarget;   //申请目标，如高中，本科，研究生

    private Integer userId;

    private Timestamp applicationTime;   //申请时间

    private Date applicationReadingTime;  //申请就读时间

    private Timestamp applicationVerifytime;  //审核时间

    private String applicationLocation;   //申请目标地址

    private String applicationSuccessreply;  //申请成功后的回复评论信息

    private Integer isPassed;   //申请是否通过，0表示为审核，1通过，2未通过

    private String applicationReason;   //申请原因

    private String  applicationReasonnotpass;  //申请未通过原因

    private Schedule schedule;

    public void setApplicationVerifytime(Timestamp applicationVerifytime){
        this.applicationVerifytime = applicationVerifytime;
    }

    public Timestamp getApplicationVerifytime(){
        return applicationVerifytime;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public String getApplicationReason() {
        return applicationReason;
    }

    public void setApplicationReason(String applicationReason) {
        this.applicationReason = applicationReason;
    }

    public String getApplicationReasonnotpass() {
        return applicationReasonnotpass;
    }

    public void setApplicationReasonnotpass(String applicationReasonnotpass) {
        this.applicationReasonnotpass = applicationReasonnotpass;
    }

    public String getApplicationSuccessreply() {
        return applicationSuccessreply;
    }

    public void setApplicationSuccessreply(String applicationSuccessreply) {
        this.applicationSuccessreply = applicationSuccessreply;
    }

    public String getApplicationLocation() {
        return applicationLocation;
    }

    public void setApplicationLocation(String applicationLocation) {
        this.applicationLocation = applicationLocation;
    }

    public String getApplicationCollege() {
        return applicationCollege;
    }

    public void setApplicationCollege(String applicationCollege) {
        this.applicationCollege = applicationCollege;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicationCampus() {
        return applicationCampus;
    }

    public void setApplicationCampus(String applicationCampus) {
        this.applicationCampus = applicationCampus == null ? null : applicationCampus.trim();
    }

    public String getApplicationMajor() {
        return applicationMajor;
    }

    public void setApplicationMajor(String applicationMajor) {
        this.applicationMajor = applicationMajor == null ? null : applicationMajor.trim();
    }

    public String getApplicationTarget() {
        return applicationTarget;
    }

    public void setApplicationTarget(String applicationTarget) {
        this.applicationTarget = applicationTarget == null ? null : applicationTarget.trim();
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Timestamp getApplicationTime() {
        return applicationTime;
    }

    public void setApplicationTime(Timestamp applicationTime) {
        this.applicationTime = applicationTime;
    }

    public Date getApplicationReadingTime() {
        return applicationReadingTime;
    }

    public void setApplicationReadingTime(Date applicationReadingTime) {
        this.applicationReadingTime = applicationReadingTime;
    }

    public Integer getIsPassed() {
        return isPassed;
    }

    public void setIsPassed(Integer isPassed) {
        this.isPassed = isPassed;
    }
}