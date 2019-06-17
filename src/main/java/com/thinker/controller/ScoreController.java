package com.thinker.controller;

import com.thinker.domain.Score;
import com.thinker.domain.User;
import com.thinker.service.ScoreService;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 评分管理
 * Created by hao on 17/5/12.
 */
@Controller
@RequestMapping(value = "/score")
public class ScoreController extends BaseController {

    @Autowired
    private ScoreService scoreService;

    @RequestMapping(value="/addScore")
    @ResponseBody
    public Map<String,Object> addScore(@ModelAttribute Score score){
        score.setUserId(SessionUtil.getCurrentUser().getUserId());
        scoreService.insertScore(score);
        return generateSuccessMsg("评分成功！");
    }

}
