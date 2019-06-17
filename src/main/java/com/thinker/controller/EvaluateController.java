package com.thinker.controller;

import com.thinker.domain.Evaluate;
import com.thinker.domain.University;
import com.thinker.service.EvaluateService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 评估管理
 * Created by LJ on 2017/4/23.
 */
@Controller
@RequestMapping(value="/evaluate")
public class EvaluateController extends BaseController {

    @Autowired
    private EvaluateService evaluateService;

    //添加用户评估
    @RequestMapping(value="/userEvaluate")
    @ResponseBody
    public Map<String,Object> userEvaluate(@ModelAttribute Evaluate evaluate){
        evaluateService.addEvaluate(evaluate);
        return generateSuccessMsg("评估表提交成功！");
    }

    //查找所评估的学校列表
    @RequestMapping(value="/findUniversityEvaluate")
    @ResponseBody
    public Map<String,Object> findUniversityEvaluate() {
        Map<String,Object> map = new HashMap<>();
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<University> universityList = evaluateService.findUniversityInUniversitityressult(userId);
        if(universityList.size() > 0){
            map = MsgGenerate.bindMapMsg("universityList",universityList);
            map.put("success",true);
        }else{
            map.put("success",false);
            map.put("msg","无推荐学校！");
        }
        return map;
    }
}
