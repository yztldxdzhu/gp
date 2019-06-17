package com.thinker.controller;

import com.thinker.domain.Guide;
import com.thinker.service.GuideService;
import com.thinker.util.MsgGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 行前指南管理
 * Created by LJ on 2017/5/19.
 */
@Controller
@RequestMapping(value="/guide")
public class GuideController extends BaseController {

    @Autowired
    private GuideService guideService;

    //添加指南
    @RequestMapping(value="/addGuide")
    @ResponseBody
    public Map<String,Object> addGuide(@ModelAttribute Guide guide){
        guideService.addGuide(guide);
        return generateSuccessMsg("指南添加成功！");
    }

    //根据类型查找指南
    @RequestMapping(value="/findGuideByType")
    @ResponseBody
    public Map<String,Object> findGuideByType(@RequestParam Integer guideType){
        Guide guide = guideService.findGuideByType(guideType);
        return MsgGenerate.bindMapMsg("guide",guide);
    }

    //查找所有指南
    @RequestMapping(value="/findAllGuide")
    @ResponseBody
    public Map<String,Object> findAllGuide(){
        List<Guide> guideList = guideService.findAllGuide();
        return MsgGenerate.bindMapMsg("guideList",guideList);
    }

    //删除指南
    @RequestMapping(value="/deleteGuide")
    @ResponseBody
    public Map<String,Object> deleteGuide(@RequestParam Integer guideId){
        guideService.deleteGuideById(guideId);
        return generateSuccessMsg("指南删除成功！");
    }
}
