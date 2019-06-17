package com.thinker.mapper;


import com.thinker.domain.Application;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public interface ApplicationMapper {

    int deleteByPrimaryKey(Integer applicationId);

    int updateByPrimaryKey(Application record);

    void insertApplication(Application application);

    List<Application> selectAllApplication();

    List<Application> selectAllSuccessApplication();

    List<Application> selectAllSuccessApplicationByTarget(String applicationTarget);

    List<Application> selectAllSuccessApplicationByLocation(String applicationLocation);

    List<Application> findUserApplicationByUserId(int userId);

    List<Application> findApplicationMessageByUserId(int userId);

    void modifyIspassed(@Param(value="applicationId")int applicationId, @Param(value="ispassed")int ispassed,@Param(value="applicationVerifytime") Timestamp applicationVerifytime);
}