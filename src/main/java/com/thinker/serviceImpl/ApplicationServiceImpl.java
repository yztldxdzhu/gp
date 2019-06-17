package com.thinker.serviceImpl;

import com.thinker.domain.Application;
import com.thinker.domain.Schedule;
import com.thinker.mapper.ApplicationMapper;
import com.thinker.mapper.ScheduleMapper;
import com.thinker.service.ApplicationService;
import com.thinker.util.DateUtil;
import com.thinker.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    ApplicationMapper applicationMapper;
    @Autowired
    ScheduleMapper scheduleMapper;

    //添加申请
    @Override
    public void insertApplication(Application application){
        synchronized(this){
            application.setApplicationTime(DateUtil.getCurrentTime());
            application.setIsPassed(ISPASSED);
            Schedule schedule = new Schedule();
            applicationMapper.insertApplication(application);
            schedule.setApplicationId(application.getApplicationId());
            schedule.setScheduleStatus(Schedule.SCHEDULESTATUS0);
            schedule.setScheduleChangetime(DateUtil.getCurrentTime());
            scheduleMapper.insertSchedule(schedule);
        }
    }

    //更新申请
    @Override
    public void updateApplication(Application application){
        application.setApplicationTime(DateUtil.getCurrentTime());
        application.setIsPassed(ISPASSED);
        applicationMapper.updateByPrimaryKey(application);
    }

    //删除申请
    @Override
    public void deleteApplication(int applicationId){
        applicationMapper.deleteByPrimaryKey(applicationId);
    }

    //查找所有需要审核的申请
    @Override
    public List<Application> findAllApplication(){
        return applicationMapper.selectAllApplication();
    }

    //查找用户的所有申请加时刻表信息
    @Override
    public List<Application> findUserApplicationByUserId(int userId){
        return applicationMapper.findUserApplicationByUserId(userId);
    }

    //查找用户的所有申请信息
    @Override
    public List<Application> findApplicationMessageByUserId(int userId){
        return applicationMapper.findApplicationMessageByUserId(userId);
    }

    //审核用户申请
    @Override
    public void verifyApplication(int applicationId,int ispassed){
        applicationMapper.modifyIspassed(applicationId,ispassed,DateUtil.getCurrentTime());
        if(ispassed == ISPASSED1){
            Schedule schedule = scheduleMapper.selectScheduleByApplicationId(applicationId);
            if(schedule != null){
                schedule.setScheduleStatus(Schedule.SCHEDULESTATUS1);
                schedule.setScheduleChangetime(DateUtil.getCurrentTime());
                scheduleMapper.modifySchedule(schedule);
            }else{
                throw new MessageException("时刻表获取失败！");
            }
        }
    }

    //查找所有成功申请
    @Override
    public List<Application> findAllSuccessApplication(){
        return applicationMapper.selectAllSuccessApplication();
    }

    //根据目标查找所有成功申请
    @Override
    public List<Application> findAllSuccessApplicationByTarget(String applicationTarget){
        return applicationMapper.selectAllSuccessApplicationByTarget(applicationTarget);
    }

    //根据州查找所有成功申请
    @Override
    public List<Application> selectAllSuccessApplicationByLocation(String applicationLocation){
        return applicationMapper.selectAllSuccessApplicationByLocation(applicationLocation);
    }
}
