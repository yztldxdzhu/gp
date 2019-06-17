package com.thinker.mapper;


import com.thinker.domain.Expert;
import com.thinker.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserMapper {

    int deleteByPrimaryKey(Integer userId);

    void insertUser(User user);

    Integer selectUserIdByTel(String tel);

    User selectUserByUserTel(String userTel);

    void updateByPrimaryKey(User user);

    String findPwdByTel(String Tel);

    User selectUserByUserId(int userId);

    List<User> selectAllUser();

    List<User> selectAllUserOfExpert(int expertId);

    Integer selectExpertIdByUserId(int userId);

    void userBindExpert(@Param(value="userId") int userId,@Param(value="expertId") int expertId);

}