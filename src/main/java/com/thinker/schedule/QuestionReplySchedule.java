package com.thinker.schedule;

import com.thinker.domain.Question;
import com.thinker.mapper.QuestionMapper;
import com.thinker.redis.RedisUtils;
import com.thinker.serviceImpl.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.List;

/**
 * Created by LJ on 2017/6/4.
 */
@Component("questionReplySchedule")
public class QuestionReplySchedule {

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private RedisUtils redisUtils;

    @Scheduled(cron = "0/10 * *  * * ? ")
    public void updateNewQuestionCache() throws NoSuchMethodException {
        String target = QuestionServiceImpl.class.getName();
        Method method = QuestionServiceImpl.class.getMethod("findNewQuestion");
        String key = target+"_"+method.getName();
        if(redisUtils.exists(key)){
            List<Question> newQuestionList = questionMapper.getNewQuestion();
            redisUtils.set(key,newQuestionList);
        }
    }
}
