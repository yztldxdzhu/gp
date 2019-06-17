package com.thinker.controller;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import com.thinker.service.ExpertService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 顾问管理
 * Created by yhh on 2017/4/23.
 */
@Controller
@RequestMapping(value = "/expert")
public class ExpertController extends BaseController {

    @Autowired
    private ExpertService expertService;

    //查询当前顾问信息
    @RequestMapping(value = "/expertMessageGet")
    @ResponseBody
    public Map<String, Object> expertMessageGet() {
        Map<String,Object> map=new HashMap<>();
        int expertId=((Expert)SessionUtil.getSession().getAttribute("expert")).getExpertId();
        Expert expert=expertService.expertMessageGet(expertId);
        map.put("msg",expert);
        map.put("success",true);
        return map;
    }

    //根据Id查询顾问信息
    @RequestMapping(value = "/findExpertMessageByExpertId")
    @ResponseBody
    public Map<String, Object> findExpertMessageByExpertId(@RequestParam Integer expertId) {
        Map<String,Object> map = new HashMap<>();
        Expert expert = expertService.expertMessageGet(expertId);
        if(expert != null){
            map.put("expert",expert);
            map.put("isOk",true);
        }else{
            map.put("expert",null);
            map.put("isOk",false);
        }
        return map;
    }

    //根据Id删除顾问
    @RequestMapping(value = "/deleteExpert")
    @ResponseBody
    public Map<String, Object> deleteExpert(@RequestParam Integer expertId) {
        expertService.deleteExpert(expertId);
        return generateSuccessMsg("删除顾问成功！");
    }


    //查询同一标签的所有通过的顾问
    @RequestMapping(value = "/findAllPassedExpertByTag")
    @ResponseBody
    public Map<String, Object> findAllPassedExpertByTag(@RequestParam Integer tagId) {
        Map<String, Object> map = new HashMap<>();
        List<Expert> experts = expertService.selectAllPassedExpertByTag(tagId);
        map.put("msg", experts);
        map.put("success", true);
        return map;
    }

    //顾问注册
    @RequestMapping(value = "/expertRegister")
    @ResponseBody
    public Map<String, Object> expertRegister(Expert expert) {
        Expert expert1 = expertService.selectExpertByExpert_tel(expert.getExpertTel());
        if (expert1 != null) {
            return generateFailureMsg("该手机号已经被注册");
        } else {
            expertService.insert(expert);
            return generateSuccessMsg("顾问注册成功");
        }
    }

    //查询所有通过的顾问信息
    @RequestMapping(value = "/findAllPassedExpert")
    @ResponseBody
    public Map<String, Object> findAllPassedExpert() {
        Map<String, Object> map = new HashMap<>();
        List<Expert> expertList = expertService.selectAllPassedExpert();
        map.put("expertList", expertList);
        return map;
    }

    //查询所有顾问信息
    @RequestMapping(value = "/findAllExpert")
    @ResponseBody
    public Map<String, Object> findAllExpert() {
        Map<String,Object> map = new HashMap<>();
        List<Expert> noPassExpertList = new ArrayList<>();
        List<Expert> passExpertList = new ArrayList<>();
        List<Expert> expertList = expertService.selectAllExpert();
        for(Expert expert:expertList){
            if(expert.getExpertStatus() == 0 ){
                noPassExpertList.add(expert);
            }else{
                passExpertList.add(expert);
            }
        }
        map.put("noPassExpertList",noPassExpertList);
        map.put("passExpertList",passExpertList);
        return map;
    }

    //查询所有顾问信息
    @RequestMapping(value = "/findAllUserOfExpert")
    @ResponseBody
    public Map<String, Object> findAllUserOfExpert() {
        int expertId=((Expert)SessionUtil.getSession().getAttribute("expert")).getExpertId();
        List<User> userList = expertService.selectAllUserOfExpert(expertId);
        return MsgGenerate.bindMapMsg("userList",userList);
    }

    //更新顾问信息
    @RequestMapping(value = "/expertMessageUpdate")
    @ResponseBody
    public Map<String, Object> expertMessageUpdate(@ModelAttribute Expert expert, @RequestParam(value="expertPictureContent")MultipartFile expertPictureContent) {
        int expertId = ((Expert) (SessionUtil.getSession().getAttribute("expert"))).getExpertId();
        expert.setExpertId(expertId);
        if(expertPictureContent != null){
            expertService.updateExpert(expert,expertPictureContent);
            return generateSuccessMsg("顾问信息更新成功！");
        }else{
            return generateFailureMsg("头像上传失败，请重新上传！");
        }
    }

    //审核顾问
    @RequestMapping(value = "/verifyExpert")
    @ResponseBody
    public Map<String, Object> verifyExpert(@RequestParam Integer expertId,@RequestParam Integer expertStatus) {
        Map<String, Object> map = new HashMap<>();
        expertService.verifyExpert(expertId, expertStatus);
        map.put("msg", "审核通过");
        map.put("success", true);
        return map;
    }
}
