package com.thinker.schedule;

import com.thinker.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by LJ on 2017/6/8.
 */
@Component("orderSchedule")
public class OrderSchedule {

    @Autowired
    private OrderMapper orderMapper;

    @Scheduled(cron = "0 0 0 15 * ? ")
    public void deleteCancelOrder(){
        orderMapper.deleteCancelOrder();
    }
}
