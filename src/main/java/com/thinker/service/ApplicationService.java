package com.thinker.service;

import com.thinker.domain.Application;

import java.util.List;

/**
 * Created by mgh on 2017/4/18.
 */
public interface ApplicationService {

     int ISPASSED = 0;   //表示申请表未审核
     int ISPASSED1 = 1;   //表示申请表审核通过
     int ISPASSED2 = 2;   //表示申请表审核未通过

     void insertApplication(Application application);

     void updateApplication(Application application);

     void deleteApplication(int applicationId);

     List<Application> findAllApplication();

     List<Application> findUserApplicationByUserId(int userId);

     List<Application> findApplicationMessageByUserId(int userId);

     List<Application> findAllSuccessApplication();

     List<Application> findAllSuccessApplicationByTarget(String applicationTarget);

     List<Application> selectAllSuccessApplicationByLocation(String applicationLocation);

     void verifyApplication(int applicationId,int ispassed);
}
