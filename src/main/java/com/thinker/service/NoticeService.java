package com.thinker.service;

import com.thinker.domain.Notice;

import java.util.List;

/**
 * Created by mgh on 2017/4/18.
 */
public interface NoticeService {

    List<Notice> getUserNotice(int userId);
}
