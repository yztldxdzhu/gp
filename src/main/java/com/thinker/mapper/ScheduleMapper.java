package com.thinker.mapper;


import com.thinker.domain.Schedule;
import org.springframework.stereotype.Component;

@Component
public interface ScheduleMapper {

    int deleteByPrimaryKey(Integer scheduleId);

    int updateByPrimaryKey(Schedule record);

    void insertSchedule(Schedule schedule);

    void modifySchedule(Schedule schedule);

    Schedule selectScheduleByApplicationId(int applicationId);
}