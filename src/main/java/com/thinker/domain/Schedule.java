package com.thinker.domain;

import java.sql.Timestamp;

public class Schedule {

    public static final int SCHEDULESTATUS0 = 0;   //申请表未审核

    public static final int SCHEDULESTATUS1 = 1;   //申请表审核通过

    public static final int SCHEDULESTATUS2 = 2;   //校级相关材料审核通过

    public static final int SCHEDULESTATUS3 = 3;   //语言成绩材料审核通过

    public static final int SCHEDULESTATUS4 = 4;   //毕业证书审核通过

    private Integer scheduleId;

    private Integer scheduleStatus;   //申请时刻表所处阶段状态，1表示申请信息审核成功，2表示材料提交阶段审核成功，3表示语言成绩阶段审核成功，4表示毕业证书阶段审核成功，5表示签证审核成功，即或表示申请留学成功

    private Timestamp scheduleChangetime;   //时刻表更新时间

    private Integer applicationId;

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getScheduleStatus() {
        return scheduleStatus;
    }

    public void setScheduleStatus(Integer scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
    }

    public Timestamp getScheduleChangetime() {
        return scheduleChangetime;
    }

    public void setScheduleChangetime(Timestamp scheduleChangetime) {
        this.scheduleChangetime = scheduleChangetime;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }
}