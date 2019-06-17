package com.thinker.service;

import com.thinker.domain.College;
import com.thinker.domain.Major;
import com.thinker.domain.University;
import com.thinker.domain.Universitymajor;
import com.thinker.util.annotation.Intercept;

import java.util.List;
import java.util.Map;

/**
 * Created by mgh on 2017/4/18.
 */
public interface UniversityService {

    Map<String,Object> updateUniversity(University university);

    Map<String,Object> deleteByPrimaryKey(Integer universityId);

    Map<String,Object>  insert(List<University> universityList);

    @Intercept
    List<University>  selectAllUniversity();

    Map<String,Object>  selectByPrimaryKey(Integer universityId);

    List<University> searchUniversity(String universityKeyWords);

    List<University> findAllUniversityByState(String universityState);

    List<College> findCollegeByUniversityId(Integer universityId);

    List<Major> findMajorByUniversityIdAndCollegeId(Integer universityId,Integer collegeId);

    void addCollegeMajor(Universitymajor universitymajor);

    Map<String,Object> searchUniversityByPage(String universityKeyWords,int pageNow,int pageSize);

}
