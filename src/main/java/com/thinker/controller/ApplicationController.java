package com.thinker.controller;

import com.thinker.domain.Application;
import com.thinker.domain.User;
import com.thinker.service.ApplicationService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 申请管理
 * Created by LJ on 2017/4/23.
 */
@Controller
@RequestMapping(value="/application")
public class ApplicationController extends BaseController {
    @Autowired
    private ApplicationService applicationService;

    //添加申请
    @RequestMapping(value = "/addApplication")
    @ResponseBody
    public Map<String,Object> addApplication(@ModelAttribute Application application){
        User user = SessionUtil.getCurrentUser();
        application.setUserId(user.getUserId());
        applicationService.insertApplication(application);
        return generateSuccessMsg("申请添加成功！");
    }

    //更新申请
    @RequestMapping(value = "/updateApplication")
    @ResponseBody
    public Map<String,Object> updateApplication(@ModelAttribute Application application){
        applicationService.updateApplication(application);
        return generateSuccessMsg("申请修改成功！");
    }

    //删除申请
    @RequestMapping(value = "/deleteApplication")
    @ResponseBody
    public Map<String,Object> deleteApplication(@RequestParam Integer applicationId){
        applicationService.deleteApplication(applicationId);
        return generateSuccessMsg("删除申请成功！");
    }

    //查找所有申请
    @RequestMapping(value = "/findAllApplication")
    @ResponseBody
    public Map<String,Object> findAllApplication(){
        Map<String,Object> map = new HashMap<>();
        List<Application> noVerifyApplicationList = new ArrayList<>();
        List<Application> passApplicationList = new ArrayList<>();
        List<Application> noPassApplicationList = new ArrayList<>();
        List<Application> applicationList = applicationService.findAllApplication();
        for(Application application:applicationList){
            if(application.getIsPassed() == 0 ){
                noVerifyApplicationList.add(application);
            }else if(application.getIsPassed() == 1){
                passApplicationList.add(application);
            }else{
                noPassApplicationList.add(application);
            }
        }
        map.put("noPassApplicationList",noPassApplicationList);
        map.put("passApplicationList",passApplicationList);
        map.put("noVerifyApplicationList",noVerifyApplicationList);
        return map;
    }

    //根据用户ID查找用户的所有申请
    @RequestMapping(value = "/findUserApplication")
    @ResponseBody
    public Map<String,Object> findUserApplication(){
        Map<String,Object> map = new HashMap<>();
        List<Application> applicationList = applicationService.findUserApplicationByUserId(SessionUtil.getCurrentUser().getUserId());
        map.put("userApplicationList",applicationList);
        return map;
    }

    //审核用户申请
    @RequestMapping(value = "/verifyApplication")
    @ResponseBody
    public Map<String,Object> verifyApplication(@RequestParam Integer applicationId,@RequestParam Integer ispassed){
        applicationService.verifyApplication(applicationId,ispassed);
        return generateSuccessMsg("审核成功！");
    }

    //查找所有成功申请
    @RequestMapping(value = "/findAllSuccessApplication")
    @ResponseBody
    public Map<String,Object> findAllSuccessApplication(){
        List<Application> successApplicationList = applicationService.findAllSuccessApplication();
        return MsgGenerate.bindMapMsg("successApplicationList",successApplicationList);
    }

    //通过Targert目标查找所有成功申请
    @RequestMapping(value = "/findAllSuccessApplicationByTarget")
    @ResponseBody
    public Map<String,Object> findAllSuccessApplicationByTarget(@RequestParam(value="applicationTarget") String applicationTarget){
        List<Application> successApplicationList = applicationService.findAllSuccessApplicationByTarget(applicationTarget);
        return MsgGenerate.bindMapMsg("successApplicationList",successApplicationList);
    }

    //通过地址查找所有成功申请
    @RequestMapping(value = "/findAllSuccessApplicationByLocation")
    @ResponseBody
    public Map<String,Object> findAllSuccessApplicationByLocation(@RequestParam(value="applicationLocation") String applicationLocation){
        List<Application> successApplicationList = applicationService.selectAllSuccessApplicationByLocation(applicationLocation);
        return MsgGenerate.bindMapMsg("successApplicationList",successApplicationList);
    }
}
