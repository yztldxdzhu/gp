package com.thinker.mapper;


import com.thinker.domain.Expert;
import com.thinker.domain.Experttag;
import com.thinker.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ExpertMapper {

    Expert selectByExpertTel(String expertTel);

    Expert selectExpertByUserId(int userId);

    List<Expert> selectAllPassedExpertByTag(int tagId);

    void insertExpert(Expert expert);

    void insertExpertTag(List<Experttag> experttagList);

    List<Expert> selectAllPassedExpert();

    List<Expert> selectAllExpert();

    void updateExpert(Expert expert);

    void verifyExpert(@Param(value = "expertId") int expertId, @Param(value = "expertStatus") int expertStatus);

    Expert selectExpertById(Integer expertId);

    void deleteExpertById(Integer expertId);

    void deleteExpertByIdInExpertTag(Integer expertId);

    void deleteExpertTagByExpertId(Integer expertId);
}