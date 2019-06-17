package com.thinker.service;


import com.thinker.domain.Question;
import com.thinker.util.annotation.Intercept;

import java.util.List;

/**
 * Created by yhh on 2017/4/18.
 */
public interface QuestionService {

    void insertQuestion(int userId, int tagId,String questionContent);

    List<Question> findQuestionByUserId(int userId);

    void deleteQuestion(int questionId);

    void verifyQuestion(int questionId,int questionIspassed);

    List<Question> findAllQuestionByTagId(int tagId);

    List<Question> findAllQuestion();

    @Intercept
    List<Question> findAllPassedQuestion();

    @Intercept
    List<Question> findNewQuestion();

}
