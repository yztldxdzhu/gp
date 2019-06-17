package com.thinker.mapper;

import com.thinker.domain.Tag;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public interface TagMapper {

    void insertTag(String tagContent);

    void deleteTag(int tagId);

    List<Tag> findAllTag();
}
