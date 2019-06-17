package com.thinker.mapper;


import com.thinker.domain.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UniversityMapper {

    int deleteByPrimaryKey(Integer universityId);

    int insert(List<University> universityList);

    List<University> selectAllUniversity();

    List<University> selectAllUniversityByState(String universityState);

    University selectByPrimaryKey(Integer universityId);

    List<College> selectCollegeByUniversityId(Integer universityId);

    List<Major> selectMajorByUniversityIdAndCollegeId(@Param(value="universityId") Integer universityId,@Param(value="collegeId") Integer collegeId);

    List<Universitypicture> selectPicturesByUniversityId(Integer universityId);

    int updateByPrimaryKey(University university);

    void addCollegeMajor(@Param(value="universityId") int universityId,@Param(value="collegeId") int collegeId,@Param(value="majorId") int majorId);

    void insertUniversitymajor(List<Universitymajor> universitymajorList);

    void insertCollege(List<College> collegeList);

    void insertMajor(List<Major> majorList);
}