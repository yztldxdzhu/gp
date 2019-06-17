package com.thinker.controller;

import com.thinker.domain.College;
import com.thinker.domain.Major;
import com.thinker.domain.University;
import com.thinker.domain.Universitymajor;
import com.thinker.service.UniversityService;
import com.thinker.util.MsgGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 学校管理
 * Created by LJ on 2017/4/23.
 */
@Controller
@RequestMapping(value = "/university")
public class UniversityController extends BaseController {

    @Autowired
    private UniversityService universityService;

    //查找所有院校
    @RequestMapping(value="/findAllUniversity")
    @ResponseBody
    public Map<String,Object> findAllUniversity(){
        List<University> universityList = universityService.selectAllUniversity();
        return MsgGenerate.bindMapMsg("universityList",universityList);
    }

    //添加院校
    @RequestMapping(value="/addUniversity")
    @ResponseBody
    public Map<String,Object> addUniversity(@RequestBody List<University> universityList){
        Map<String, Object> map ;
        map=universityService.insert(universityList);
        return map;
    }

    //添加学院专业
    @RequestMapping(value="/addCollegeMajor")
    @ResponseBody
    public Map<String,Object> addCollegeMajor(@ModelAttribute Universitymajor universitymajor){
        universityService.addCollegeMajor(universitymajor);
        return generateSuccessMsg("添加学院专业成功！");
    }

    //更新学校
    @RequestMapping(value="/updateUniversity")
    @ResponseBody
    public Map<String,Object> updateUniversity(@ModelAttribute University university){
        Map<String, Object> map ;
        map=universityService.updateUniversity(university);
        return map;
    }

    //通过学校ID选择
    @RequestMapping(value="/findUniversityById")
    @ResponseBody
    public Map<String,Object> findUniversityById(@RequestParam Integer universityId){
        return universityService.selectByPrimaryKey(universityId);
    }

    //通过学校ID找到所有学院
    @RequestMapping(value="/findCollegeByUniversityId")
    @ResponseBody
    public Map<String,Object> findCollegeByUniversityId(@RequestParam Integer universityId){
        List<College> collegeList = universityService.findCollegeByUniversityId(universityId);
        return MsgGenerate.bindMapMsg("collegeList",collegeList);
    }

    //通过学校ID、学院ID找到所有专业
    @RequestMapping(value="/findMajorByUniversityIdAndCollegeId")
    @ResponseBody
    public Map<String,Object> findMajorByUniversityIdAndCollegeId(@RequestParam Integer universityId,@RequestParam Integer collegeId){
        List<Major> majorList = universityService.findMajorByUniversityIdAndCollegeId(universityId,collegeId);
        return MsgGenerate.bindMapMsg("majorList",majorList);
    }

    //通过所在州得到所有大学
    @RequestMapping(value="/findAllUniversityByState")
    @ResponseBody
    public Map<String,Object> findAllUniversityByState(@RequestParam String universityState){
        List<University> universityList = universityService.findAllUniversityByState(universityState);
        return MsgGenerate.bindMapMsg("universityList",universityList);
    }

    //根据关键字搜索院校
    @RequestMapping(value = "/searchUniversity")
    @ResponseBody
    public Map<String,Object> searchUniversity(@RequestParam(value = "universityKeyWords") String universityKeyWords){
        List<University> universityList = universityService.searchUniversity(universityKeyWords);
        if (universityList != null && universityList.size() != 0){
            Map<String,Object> map=new HashMap<>();
            map.put("universityList",universityList);
            map.put("success",true);
            map.put("msg","搜索成功！");
            return map;
        }else {
            return generateFailureMsg("没有搜索到大学");
        }
    }

    //分页搜索学校
    @RequestMapping(value="/searchUniversityByPage")
    @ResponseBody
    public Map<String,Object> searchGoodsByPage(@RequestParam(value="universityKeyWords") String universityKeyWords,@RequestParam(value="pageNow") Integer pageNow,@RequestParam(value="pageSize") Integer pageSize){
        return universityService.searchUniversityByPage(universityKeyWords,pageNow,pageSize);
    }
}
