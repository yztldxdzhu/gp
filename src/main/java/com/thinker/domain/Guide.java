package com.thinker.domain;

import java.util.Date;

/**
 * Created by LJ on 2017/4/23.
 */
public class Guide {

    private int guideId;

    private int guideType;   //行前指导类型

    private String guideContent;   //行前指导内容

    private Date guideTime;   //行前指导更新时间

    public int getGuideId() {

        return guideId;
    }

    public void setGuideId(int guideId) {
        this.guideId = guideId;
    }

    public int getGuideType() {
        return guideType;
    }

    public void setGuideType(int guideType) {
        this.guideType = guideType;
    }

    public String getGuideContent() {
        return guideContent;
    }

    public void setGuideContent(String guideContent) {
        this.guideContent = guideContent;
    }

    public Date getGuideTime() {
        return guideTime;
    }

    public void setGuideTime(Date guideTime) {
        this.guideTime = guideTime;
    }
}
