package com.thinker.domain;

public class Major {
    private Integer majorId;

    private String majorName;   //专业中文名

    private String majorEnname;   //专业英文名

    public Integer getMajorId() {
        return majorId;
    }

    public void setMajorId(Integer majorId) {
        this.majorId = majorId;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName == null ? null : majorName.trim();
    }

    public String getMajorEnname() {
        return majorEnname;
    }

    public void setMajorEnname(String majorEnname) {
        this.majorEnname = majorEnname == null ? null : majorEnname.trim();
    }
}