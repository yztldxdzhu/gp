package com.thinker.service;

import com.thinker.domain.Score;

import java.util.Map;

/**
 * Created by hao on 17/5/12.
 */
public interface ScoreService {

    Map<String,Object> insertScore(Score score);

}
