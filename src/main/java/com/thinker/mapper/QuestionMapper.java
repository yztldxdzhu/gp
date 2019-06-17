package com.thinker.mapper;

import com.thinker.domain.Question;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

/**
 * Created by yhh on 2017/4/23.
 */
@Component
public interface QuestionMapper {

    void addQuestion(Question question);

    List<Question> getQuestionByUserId(int userId);

    void removeQuestion(int questionId);

    void modifyQuestionIspassedByQuestionId(@Param(value="questionId") int questionId,@Param(value="questionIspassed")int questionIspassed);

    List<Question> getAllQuestionByTagId(int tagId);

    List<Question> getAllQuestion();

    List<Question> getAllPassedQuestion();

    List<Question> getNewQuestion();
}
