package com.thinker.serviceImpl;

import com.thinker.domain.Application;
import com.thinker.domain.Expert;
import com.thinker.domain.Experttag;
import com.thinker.domain.User;
import com.thinker.mapper.ApplicationMapper;
import com.thinker.mapper.ExpertMapper;
import com.thinker.mapper.UserMapper;
import com.thinker.service.ExpertService;
import com.thinker.util.image.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yhh on 2017/4/23.
 */
@Component
public class ExpertServiceImpl implements ExpertService {

    public final static String TARGETPATH = "public/images/upload/Logo";

    @Autowired
    private ExpertMapper expertMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ApplicationMapper applicationMapper;

    //查询该手机号是否已经被注册
    @Override
    public Expert selectExpertByExpert_tel(String expertTel) {
        return expertMapper.selectByExpertTel(expertTel);
    }

    //根据同一标签查询所有顾问
    @Override
    public List<Expert> selectAllPassedExpertByTag(Integer tagId) {
        List<Expert> expertList = expertMapper.selectAllPassedExpertByTag(tagId);
        return expertList;
    }

    //根据ID查询某个顾问信息
    @Override
    public Expert expertMessageGet(int expertId) {
        Expert expert=expertMapper.selectExpertById(expertId);
        return expert;
    }

    //顾问注册
    @Override
    public void insert(Expert expert) {
        int expert_status = 0;
        expert.setExpertStatus(expert_status);
        expertMapper.insertExpert(expert);
        addExpertTag(expert);

    }

    //查询所有通过审核顾问信息
    @Override
    public List<Expert> selectAllPassedExpert() {
        List<Expert> experts = expertMapper.selectAllPassedExpert();
        return experts;
    }

    //查询所有顾问信息
    @Override
    public List<Expert> selectAllExpert() {
         return expertMapper.selectAllExpert();
    }

    //更新顾问信息
    @Override
    public void updateExpert(Expert expert, MultipartFile expertPictureContent) {
        String expertHeadPicture = ImageUtil.upload(expertPictureContent,TARGETPATH);
        expert.setExpertHeadPicture(expertHeadPicture);
        expertMapper.updateExpert(expert);
        expertMapper.deleteExpertTagByExpertId(expert.getExpertId());
        addExpertTag(expert);

    }

    //审核顾问
    @Override
    public void verifyExpert(int expertId, int expertStatus) {
        expertMapper.verifyExpert(expertId, expertStatus);
    }

    //删除顾问
    @Override
    public void deleteExpert(int expertId) {
        expertMapper.deleteExpertById(expertId);
        expertMapper.deleteExpertByIdInExpertTag(expertId);
    }

    //查找顾问所有用户
    @Override
    public List<User> selectAllUserOfExpert(int expertId) {
        List<User> userList = userMapper.selectAllUserOfExpert(expertId);
        if(userList != null && userList.size() != 0){
            for(User user:userList){
                List<Application> applicationList = applicationMapper.findApplicationMessageByUserId(user.getUserId());
                if(applicationList != null && applicationList.size() != 0){
                    user.setApplicationList(applicationList);
                }
            }
        }
        return userList;
    }

    //删除标签
    @Override
    public void deleteExpertTagByExpertId(int expertId) {
        expertMapper.deleteExpertTagByExpertId(expertId);
    }

    //添加顾问标签
    private void addExpertTag(Expert expert){
        String[] tagStrs = expert.getTagString().split(",");
        List<Experttag> experttagList = new ArrayList<>();
        for (String tagStr:tagStrs){
            Experttag experttag = new Experttag();
            experttag.setTagId(Integer.valueOf(tagStr));
            experttag.setExpertId(expert.getExpertId());
            experttagList.add(experttag);
        }
        expertMapper.insertExpertTag(experttagList);
    }
}
