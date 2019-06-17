package com.thinker.serviceImpl;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import com.thinker.dto.RegisterUser;
import com.thinker.mapper.ExpertMapper;
import com.thinker.mapper.UserMapper;
import com.thinker.service.UserService;
import com.thinker.util.Domain2Dto;
import com.thinker.util.MsgGenerate;
import com.thinker.util.random.RandomUtil;
import com.thinker.util.sendMsgUtil.SendMsg;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by LJ on 2017/4/23.
 */

@Component
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ExpertMapper expertMapper;

    //根据手机号获得用户ID
    @Override
    public Integer selectUserIdByTel(String tel) {
        return userMapper.selectUserIdByTel(tel);
    }

    //根据手机号获得用户信息
    @Override
    public User selectUserByUserTel(String userTel) {
        return  userMapper.selectUserByUserTel(userTel);
    }

    //添加用户信息
    @Override
    public void insertUser(RegisterUser registerUser) {
        User user = new User();
        new Domain2Dto().dtoToDomain(registerUser,user);
        userMapper.insertUser(user);
    }

    //更新用户信息
    @Override
    public void updateUser(User user) {
        userMapper.updateByPrimaryKey(user);
    }

    //发送验证码
    @Override
    public Map<String,Object> sendCode(String userTel){
        String randomNumber = RandomUtil.createRandom();
        SendMsg.sendUserCode("【物联网实验室】欢迎使用留学App，您的手机验证码是" + randomNumber + "。本条信息无需回复", userTel);
        long startTime = new Date().getTime();
        SessionUtil.bindSession("randomNumber",randomNumber);
        SessionUtil.bindSession("userTel",userTel);
        SessionUtil.bindSession("startTime",startTime);
        return MsgGenerate.getSuccessMap("短信验证码发送成功！");
    }

    //验证短信验证码
    @Override
    public Map<String, Object> validateCode(String phoneNumber,String testCode ){
        String userTel = (String)SessionUtil.getSession().getAttribute("userTel");
        String randomNumber = (String)SessionUtil.getSession().getAttribute("randomNumber");
        long startTime = (long)SessionUtil.getSession().getAttribute("startTime");
        long endTime = new Date().getTime();
        if(!(phoneNumber.equalsIgnoreCase(userTel))){
            return MsgGenerate.getErrorMap("手机号不匹配！");
        }else if((endTime - startTime) > 60000){
            return MsgGenerate.getErrorMap("验证码超时！");
        }else if(!(randomNumber.equalsIgnoreCase(testCode))){
            return MsgGenerate.getErrorMap("验证码不正确！");
        }else{
            return MsgGenerate.getSuccessMap("短信验证成功！");
        }
    }

    //根据电话号码找回用户密码
    @Override
    public String pwdBack(String Tel){
        return userMapper.findPwdByTel(Tel);
    }

    //根据userId获得用户信息
    @Override
    public User selectUserByUserId(int userId){
        return userMapper.selectUserByUserId(userId);
    }

    //获得所有用户信息
    @Override
    public List<User> selectAllUser(){
        return userMapper.selectAllUser();
    }

    //根据userId删除用户信息
    @Override
    public void deleteUserByUserId(int userId){
        userMapper.deleteByPrimaryKey(userId);
    }

    //根据userId绑定顾问
    @Override
    public Map<String,Object> userBindExpert(int userId,int expertId){
        Integer alreadyExpertId = userMapper.selectExpertIdByUserId(userId);
        if(alreadyExpertId == null){
            userMapper.userBindExpert(userId,expertId);
            return MsgGenerate.getSuccessMap("顾问绑定成功！");
        }else{
            return MsgGenerate.getErrorMap("顾问已绑定！");
        }
    }

    //根据userId获得顾问信息
    @Override
    public Expert findUserExpertByUserId(int userId){
        return expertMapper.selectExpertByUserId(userId);
    }
}
