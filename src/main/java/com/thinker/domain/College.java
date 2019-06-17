package com.thinker.domain;

import java.util.List;

public class College {

    private Integer collegeId;

    private String collegeName;   //学院中文名称

    private String collegeEnname;   //学院英文名称

    private List<Major> majorList;

    public List<Major> getMajorList() {
        return majorList;
    }

    public void setMajorList(List<Major> majorList) {
        this.majorList = majorList;
    }

    public Integer getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(Integer collegeId) {
        this.collegeId = collegeId;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName == null ? null : collegeName.trim();
    }

    public String getCollegeEnname() {
        return collegeEnname;
    }

    public void setCollegeEnname(String collegeEnname) {
        this.collegeEnname = collegeEnname == null ? null : collegeEnname.trim();
    }
}