package com.thinker.mapper;


import com.thinker.domain.Evaluate;
import com.thinker.domain.University;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EvaluateMapper {

    int deleteByPrimaryKey(Integer evaluateId);

    int insertEvaluate(Evaluate record);

    List<Integer> selectUniversityIdByCollegeAndMajor(@Param(value = "collegeContent") String collegeContent, @Param(value="majorContent") String majorContent);

    Evaluate selectEvaluateByUserId(int userId);

    void updateEvaluate(Evaluate evaluate);

    void deleteEvaluateResultByEvaluateId(int evaluateId);

    void addEvaluateresult(@Param(value="evaluateId")int evaluateId,@Param(value="universityId")int universityId);

    List<University> selectUniversityByUserId(int userId);
}