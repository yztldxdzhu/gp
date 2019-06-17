package com.thinker.serviceImpl;

import com.thinker.domain.*;
import com.thinker.mapper.UniversityMapper;
import com.thinker.redis.RedisUtils;
import com.thinker.search.BaseIndex;
import com.thinker.search.UniversityIndex;
import com.thinker.service.UniversityService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.annotation.Intercept;
import com.thinker.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.thinker.util.ResultMap.generateFailureMsg;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class UniversityServiceImpl implements UniversityService {
    @Autowired
    private UniversityMapper universityMapper;

    @Autowired
    private RedisUtils<University> redisUtils;

    //更新大学信息
    public Map<String,Object> updateUniversity(University university) {
        Map<String,Object> map=new HashMap<>();
        universityMapper.updateByPrimaryKey(university);
        map.put("success", true);
        map.put("msg", "更新成功");
        return map;
    }

    //删除大学
    @Override
    public Map<String, Object> deleteByPrimaryKey(Integer universitityId) {
        Map<String,Object> map=new HashMap<>();
        universityMapper.deleteByPrimaryKey(universitityId);
        map.put("success", true);
        map.put("msg", "查询成功");
        return map;
    }

    //通过所在州得到所有大学
    @Override
    public List<University> findAllUniversityByState(String universityState) {
        List<University> universityList = universityMapper.selectAllUniversityByState(universityState.trim());
        universityList = addCollegeAndPicturesInUniversity(universityList);
        return universityList;
    }

    //通过学校ID找到该学校所有的学院
    @Override
    public List<College> findCollegeByUniversityId(Integer universityId) {
        return universityMapper.selectCollegeByUniversityId(universityId);
    }

    //通过学校ID、学院ID找到所有专业
    @Override
    public List<Major> findMajorByUniversityIdAndCollegeId(Integer universityId,Integer collegeId) {
        return universityMapper.selectMajorByUniversityIdAndCollegeId(universityId,collegeId);
    }

    //添加大学
    @Override
    public Map<String, Object> insert(List<University> universityList) {
        BaseIndex<University> universityIndex=new UniversityIndex();
        List<Universitymajor> universitymajorList = new ArrayList<>();
        Map<String,Object> map=new HashMap<>();
        universityMapper.insert(universityList);
        for(University university:universityList){
            List<College> collegeList = university.getCollegeList();
            if(collegeList != null && collegeList.size() != 0){
                universityMapper.insertCollege(collegeList);
                for(College college:collegeList){
                    List<Major> majorList = college.getMajorList();
                    universityMapper.insertMajor(majorList);
                    if(majorList != null && majorList.size() != 0){
                        for(Major major:majorList){
                            Universitymajor universitymajor = new Universitymajor();
                            universitymajor.setUniversityId(university.getUniversityId());
                            universitymajor.setCollegeId(college.getCollegeId());
                            universitymajor.setMajorId(major.getMajorId());
                            universitymajorList.add(universitymajor);
                        }
                    }
                }
            }
        }
        universityMapper.insertUniversitymajor(universitymajorList);
        try {
            universityIndex.indexDocs(universityList);  //索引
        } catch (Exception e) {
            throw new MessageException("插入索引搜索失败！");
        }
        map.put("success", true);
        map.put("msg", "插入成功");
        return map;
    }

    //查找所有大学
    @Intercept
    public List<University> selectAllUniversity() {
        List<University> universityList = universityMapper.selectAllUniversity();
        universityList = addCollegeAndPicturesInUniversity(universityList);
        return universityList;
    }

    //根据ID查找大学
    @Override
    public Map<String, Object> selectByPrimaryKey(Integer universityId) {
        Map<String,Object> map=new HashMap<>();
        University university= universityMapper.selectByPrimaryKey(universityId);
        List<College> collegeList = universityMapper.selectCollegeByUniversityId(universityId);
        List<Universitypicture> universitypictureList = universityMapper.selectPicturesByUniversityId(universityId);
        if(collegeList != null && collegeList.size() != 0){
            university.setCollegeList(collegeList);
        }else{
            university.setCollegeList(null);
        }
        if(universitypictureList != null && universitypictureList.size() != 0){
            university.setUniversitypictureList(universitypictureList);
        }else{
            university.setUniversitypictureList(null);
        }
        map.put("success", true);
        map.put("university", university);
        return map;
    }

    //根据关键字查找匹配的所有大学
    @Override
    public List<University> searchUniversity(String universityKeyWords) {
        BaseIndex<University> universityIndex=new UniversityIndex(redisUtils);
        try {
            return universityIndex.searchUniversity(universityKeyWords);
        } catch (Exception e) {
            e.printStackTrace();
            throw new MessageException("搜索失败！");
        }
    }

    //分页搜索商品
    @Override
    public Map<String,Object> searchUniversityByPage(String universityKeyWords,int pageNow,int pageSize){
        BaseIndex<University> universityIndex = new UniversityIndex(redisUtils);
        try {
            List<University> universityList = universityIndex.searchUniversityByPage(universityKeyWords,pageNow,pageSize);
            if(universityList != null && universityList.size() != 0){
                Map<String,Object> map = MsgGenerate.bindMapMsg("universityList",universityList);
                map.put("success",true);
                map.put("msg","搜索成功！");
                return map;
            }else{
                return generateFailureMsg("没有搜到学校！");
            }
        } catch (Exception e) {
            throw new MessageException("搜索失败！");
        }
    }

    //添加学院专业
    @Override
    public void addCollegeMajor(Universitymajor universitymajor){
        List<Integer> majorList = universitymajor.getMajorList();
        for(Integer majorId:majorList){
            universityMapper.addCollegeMajor(universitymajor.getUniversityId(),universitymajor.getCollegeId(),majorId);
        }
    }

    //把查找的学院添加到学校
    private List<University> addCollegeAndPicturesInUniversity(List<University> universityList){
        if(universityList != null && universityList.size() != 0){
            for(University university:universityList){
                List<College> collegeList = universityMapper.selectCollegeByUniversityId(university.getUniversityId());
                List<Universitypicture> universitypictureList = universityMapper.selectPicturesByUniversityId(university.getUniversityId());
                if(collegeList != null && collegeList.size() != 0) {
                    university.setCollegeList(collegeList);
                }else{
                    university.setCollegeList(null);
                }
                if(universitypictureList != null && universitypictureList.size() != 0) {
                    university.setUniversitypictureList(universitypictureList);
                }else{
                    university.setUniversitypictureList(null);
                }
            }
        }
        return universityList;
    }
}
