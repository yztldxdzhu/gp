package com.thinker.controller;


import com.thinker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 验证管理
 * Created by LJ on 2017/4/23.
 */

@Controller
@RequestMapping(value = "/validateCode")
public class ValidateController extends BaseController {

    @Autowired
    private UserService userService;

    //找回密码
    @RequestMapping(value="/pwdBack")
    @ResponseBody
    public Map<String,Object> pwdBack(@RequestParam String phoneNumber,@RequestParam String testCode){
        int userId = userService.selectUserIdByTel(phoneNumber);
        Map<String,Object> result = userService.validateCode(phoneNumber,testCode);
        if(userId != 0){
            if(result.get("isOk").equals(true)){
                Map<String,Object> result1 = new HashMap<>();
                String pwd = userService.pwdBack(phoneNumber);
                result1.put("pwd",pwd);
                result1.put("isOk",true);
                return result1;
            }else{
                return result;
            }
        }else{
            return generateFailureMsg("手机号未注册!");
        }
    }

    //发送短信验证码
    @RequestMapping(value="/sendCode")
    @ResponseBody
    public Map<String,Object> sendCode(@RequestParam String phoneNumber){
        return userService.sendCode(phoneNumber);
    }

    //短信验证码验证
    @RequestMapping(value="/validateCode")
    @ResponseBody
    public Map<String,Object> validateCode(@RequestParam String phoneNumber,@RequestParam String testCode) {
        return userService.validateCode(phoneNumber,testCode);
    }
}
