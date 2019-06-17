package com.thinker.domain;

import java.util.List;

/**
 * Created by LJ on 2017/5/18.
 */
public class Universitymajor {

    private int universitymajorId;

    private int universityId;

    private int collegeId;

    private int majorId;

    List<Integer> majorList;  //专业列表

    public List<Integer> getMajorList() {
        return majorList;
    }

    public void setMajorList(List<Integer> majorList) {
        this.majorList = majorList;
    }

    public int getUniversitymajorId() {
        return universitymajorId;
    }

    public void setUniversitymajorId(int universitymajorId) {
        this.universitymajorId = universitymajorId;
    }

    public int getUniversityId() {
        return universityId;
    }

    public void setUniversityId(int universityId) {
        this.universityId = universityId;
    }

    public int getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(int collegeId) {
        this.collegeId = collegeId;
    }

    public int getMajorId() {
        return majorId;
    }

    public void setMajorId(int majorId) {
        this.majorId = majorId;
    }
}
