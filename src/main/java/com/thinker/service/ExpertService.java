package com.thinker.service;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by yhh on 2017/4/18.
 */
public interface ExpertService {

    //查询顾问是否已经被注册
    Expert selectExpertByExpert_tel(String expertTel);

    //查询同一标签的所有顾问
    List<Expert> selectAllPassedExpertByTag(Integer tagId);

    //查询某个顾问信息
    Expert  expertMessageGet(int expertId);

    //顾问注册
    void insert(Expert expert);

    //查询所有顾问信息
    List<Expert> selectAllPassedExpert();

    //更新顾问信息
    void updateExpert(Expert expert, MultipartFile expertPictureContent);

    //审核顾问
    void verifyExpert(int expertId, int expertStatus);

    //删除顾问
    void deleteExpert(int expertId);

    //删除标签
    void deleteExpertTagByExpertId(int expertId);

    //查找所有顾问
    List<Expert> selectAllExpert();

    //查找顾问所有用户
    List<User> selectAllUserOfExpert(int expertId);
}
