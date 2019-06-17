package com.thinker.controller;


import com.thinker.domain.Application;
import com.thinker.domain.Expert;
import com.thinker.domain.Notice;
import com.thinker.domain.User;
import com.thinker.dto.RegisterUser;
import com.thinker.service.ApplicationService;
import com.thinker.service.ExpertService;
import com.thinker.service.NoticeService;
import com.thinker.service.UserService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.image.ImageUtil;
import com.thinker.util.string.StringUtil;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户管理
 * Created by LJ on 2017/4/23.
 */

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {

    public final static String TARGETPATH = "public/images/upload/Logo";

    @Autowired
    private UserService userService;

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private ExpertService expertService;

    @Autowired
    private ApplicationService applicationService;

    //用户或顾问登录
    @RequestMapping(value = "/userLogin")
    @ResponseBody
    public Map<String,Object> userLogin(@RequestParam String userTel,@RequestParam String userPwd,@RequestParam Integer userType){
        Map<String,Object> map = new HashMap<>();
        if(StringUtil.isEmpty(userTel)){
            map = generateFailureMsg("账号不能为空！");
        }else{
            if(userType == 2){ //顾问登陆
                Expert expert = expertService.selectExpertByExpert_tel(userTel);
                if(expert==null){
                    map = generateFailureMsg("该用户尚未注册，无法登陆!");
                }else{
                    if(!(expert.getExpertPwd().equalsIgnoreCase(userPwd))){
                        map = generateFailureMsg("密码错误，请重新输入！");
                    }else{
                        SessionUtil.bindSession("expert",expert);
                        map = generateSuccessMsg("登录成功");
                    }
                }
            }else{  //用户登陆
                User user = userService.selectUserByUserTel(userTel);
                if(user == null){
                    map = generateFailureMsg("该用户尚未注册，无法登陆!");
                }else{
                    if(!(user.getUserPwd().equals(userPwd))){
                        map = generateFailureMsg("密码错误，请重新输入！");
                    }
                    else if(user.getUserType() != userType){
                        map = generateFailureMsg("用户类型错误！");
                    }else{
                        SessionUtil.bindSession("user",user);
                        map = generateSuccessMsg("登录成功");
                    }
                }
            }

        }
        return map;
    }

    //用户注册
    @RequestMapping(value="/userRegister")
    @ResponseBody
    public Map<String,Object> userRegister(@ModelAttribute RegisterUser registerUser){
        Integer userId = userService.selectUserIdByTel(registerUser.getUserTel());
        if(userId != null){
            return generateFailureMsg("手机号已被注册!");
        }else {
            userService.insertUser(registerUser);
            return generateSuccessMsg("注册成功！");
        }
    }

    //验证手机号是否注册
    @RequestMapping(value="/telCheck")
    @ResponseBody
    public Map<String,Object> userTelCheck(@RequestParam String Tel){
        Integer userId = userService.selectUserIdByTel(Tel);
        if(userId != null){
            return generateFailureMsg("该手机号已被注册！");
        }else{
            return generateSuccessMsg("该手机号可注册!");
        }
    }

    //用户信息更新
    @RequestMapping(value="/userMessageUpdate")
    @ResponseBody
    public Map<String,Object> userMessageUpdate(@ModelAttribute User user,@RequestParam("userPictureContent") MultipartFile userPictureContent){
        User user_s = (User)(SessionUtil.getSession().getAttribute("user"));
        if (user_s != null)
            user.setUserId(user_s.getUserId());
        if(userPictureContent != null){
            String pictureUrl = ImageUtil.upload(userPictureContent,TARGETPATH);
            user.setUserHeadPicture(pictureUrl);
            userService.updateUser(user);
            return generateSuccessMsg("用户信息更新成功！");
        }else{
            return generateFailureMsg("头像上传失败！请重新上传！");
        }
    }

    //根据userId获得用户信息
    @RequestMapping(value="/userMessageGet")
    @ResponseBody
    public Map<String,Object> userMessageGet(){
        Map<String,Object> map = new HashMap<>();
        User user = (User)SessionUtil.getSession().getAttribute("user");
        User user1 = userService.selectUserByUserId(user.getUserId());
        List<Application> applicationList = applicationService.findApplicationMessageByUserId(user.getUserId());
        map.put("user",user1);
        map.put("applicationList",applicationList);
        return map;
    }

    //获得所有的用户信息
    @RequestMapping(value="/findAllUser")
    @ResponseBody
    public Map<String,Object> findAllUser(){
        List<User> list = userService.selectAllUser();
        return MsgGenerate.bindMapMsg("userList",list);
    }

    //根据userId删除用户信息
    @RequestMapping(value="/deleteUser")
    @ResponseBody
    public Map<String,Object> deleteUser(@RequestParam Integer userId){
        userService.deleteUserByUserId(userId);
        return generateSuccessMsg("删除成功！");
    }

    //用户退出登录
    @RequestMapping(value="/userExit")
    @ResponseBody
    public Map<String,Object> userExit(){
        HttpSession session = SessionUtil.getSession();
        session.setAttribute("user",null);
        return generateSuccessMsg("退出成功！");
    }

    //消息通知
    @RequestMapping(value="/userNotice")
    @ResponseBody
    public Map<String,Object> userNotice(@RequestParam(value="userId") Integer userId){
        List<Notice> noticeList = noticeService.getUserNotice(userId);
        return MsgGenerate.bindMapMsg("noticeList",noticeList);
    }

    //用户绑定顾问
    @RequestMapping(value="/userBindExpert")
    @ResponseBody
    public Map<String,Object> userBindExpert(@RequestParam(value="expertId") Integer expertId){
        int userId = SessionUtil.getCurrentUser().getUserId();
        return userService.userBindExpert(userId,expertId);
    }

    //根据用户ID获得顾问信息
    @RequestMapping(value="/findUserExpert")
    @ResponseBody
    public Map<String,Object> findUserExpert(){
        int userId = SessionUtil.getCurrentUser().getUserId();
        Expert expert = userService.findUserExpertByUserId(userId);
        return MsgGenerate.bindMapMsg("expert",expert);
    }
}
