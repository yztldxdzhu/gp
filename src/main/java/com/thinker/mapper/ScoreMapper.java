package com.thinker.mapper;

import com.thinker.domain.Score;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Created by hao on 17/5/12.
 */
@Component
public interface ScoreMapper {

    void addScore(Score score);
}
