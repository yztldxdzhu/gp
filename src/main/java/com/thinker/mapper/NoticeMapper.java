package com.thinker.mapper;

import com.thinker.domain.Notice;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public interface NoticeMapper {

    List<Notice> selectUserNotice(int userId);
}
