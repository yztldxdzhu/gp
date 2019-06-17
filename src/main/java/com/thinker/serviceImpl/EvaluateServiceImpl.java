package com.thinker.serviceImpl;

import com.thinker.domain.Evaluate;
import com.thinker.domain.University;
import com.thinker.domain.User;
import com.thinker.mapper.EvaluateMapper;
import com.thinker.service.EvaluateService;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class EvaluateServiceImpl implements EvaluateService {

    @Autowired
    private EvaluateMapper evaluateMapper;

    //添加评估表并生成评估结果
    @Override
    public void addEvaluate(Evaluate evaluate){
        int  userId = ((User)SessionUtil.getSession().getAttribute("user")).getUserId();
        Evaluate evaluate1 = evaluateMapper.selectEvaluateByUserId(userId);
        int evaluateId = 0;
        if( evaluate1 != null){
            evaluateId = evaluate1.getEvaluateId();
            evaluate.setEvaluateId(evaluate1.getEvaluateId());
            evaluateMapper.updateEvaluate(evaluate);
            evaluateMapper.deleteEvaluateResultByEvaluateId(evaluate1.getEvaluateId());
        }else{
            evaluate.setUserId(userId);
            evaluateMapper.insertEvaluate(evaluate);
            evaluateId = evaluateMapper.selectEvaluateByUserId(userId).getEvaluateId();
        }
        //根据评估表评估大学
        String college = evaluate.getEvaluateCollege();
        String major = evaluate.getEvaluateMajor();
        List<Integer> universityIdList = evaluateMapper.selectUniversityIdByCollegeAndMajor(college,major);
        if(universityIdList.size() != 0){
            for(int i=0;i<universityIdList.size();i++){
                evaluateMapper.addEvaluateresult(evaluateId,universityIdList.get(i));
            }
        }
    }

    //根据ID查找所有评估大学
    @Override
    public List<University> findUniversityInUniversitityressult(int userId){
        return evaluateMapper.selectUniversityByUserId(userId);
    }
}
