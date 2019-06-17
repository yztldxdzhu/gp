package com.thinker.serviceImpl;

import com.thinker.domain.Guide;
import com.thinker.mapper.GuideMapper;
import com.thinker.service.GuideService;
import com.thinker.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class GuideServiceImpl implements GuideService {

    @Autowired
    private GuideMapper guideMapper;

    @Override
    public void addGuide(Guide guide){
        guide.setGuideTime(DateUtil.getCurrentTime());
        guideMapper.addGuide(guide);
    }

    @Override
    public Guide findGuideByType(int guideType){
        return guideMapper.findGuideByType(guideType);
    }

    @Override
    public List<Guide> findAllGuide(){
        return guideMapper.findAllGuide();
    }

    @Override
    public void deleteGuideById(int guideId){
        guideMapper.deleteGuideById(guideId);
    }
}
