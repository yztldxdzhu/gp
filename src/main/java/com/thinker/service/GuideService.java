package com.thinker.service;

import com.thinker.domain.Guide;

import java.util.List;

/**
 * Created by mgh on 2017/4/18.
 */
public interface GuideService {

    void addGuide(Guide guide);

    Guide findGuideByType(int guideType);

    List<Guide> findAllGuide();

    void deleteGuideById(int guideId);
}
