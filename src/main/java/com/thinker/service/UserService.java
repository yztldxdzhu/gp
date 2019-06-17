package com.thinker.service;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import com.thinker.dto.RegisterUser;

import java.util.List;
import java.util.Map;

/**
 * Created by mgh on 2017/4/18.
 */
public interface UserService {

    Integer selectUserIdByTel(String tel);

    User selectUserByUserTel(String userTel);

    void insertUser(RegisterUser registerUser);

    void updateUser(User user);

    Map<String,Object> sendCode(String userTel);

    Map<String, Object> validateCode(String phoneNumber,String testCode);

    String pwdBack(String userTel);

    User selectUserByUserId(int userId);

    Expert findUserExpertByUserId(int userId);

    List<User> selectAllUser();

    void deleteUserByUserId(int userId);

    Map<String,Object> userBindExpert(int userId,int expertId);
}
