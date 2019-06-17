package com.thinker.mapper;

import com.thinker.domain.Guide;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public interface GuideMapper {

    void addGuide(Guide guide);

    Guide findGuideByType(int guideType);

    List<Guide> findAllGuide();

    void deleteGuideById(int guideId);
}
