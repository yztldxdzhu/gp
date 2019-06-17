package com.thinker.service;

import com.thinker.domain.Evaluate;
import com.thinker.domain.University;

import java.util.List;

/**
 * Created by LJ on 2017/4/18.
 */
public interface EvaluateService {

    void addEvaluate(Evaluate evaluate);

    List<University> findUniversityInUniversitityressult(int userId);
}
