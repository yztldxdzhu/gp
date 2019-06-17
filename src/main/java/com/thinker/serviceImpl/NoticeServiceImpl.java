package com.thinker.serviceImpl;

import com.thinker.domain.Notice;
import com.thinker.mapper.NoticeMapper;
import com.thinker.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeMapper noticeMapper;

    //得到用户通知
    @Override
    public List<Notice> getUserNotice(int userId){
        return noticeMapper.selectUserNotice(userId);
    }
}
