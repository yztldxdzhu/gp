package com.thinker.service;

import com.thinker.domain.Tag;

import java.util.List;

/**
 * Created by LJ on 2017/4/24.
 */
public interface TagService {

    void addTag(String tagContent);

    void deleteTag(int tagId);

    List<Tag> findAllTag();
}
