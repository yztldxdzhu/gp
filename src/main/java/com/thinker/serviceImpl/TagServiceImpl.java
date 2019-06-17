package com.thinker.serviceImpl;

import com.thinker.domain.Tag;
import com.thinker.mapper.TagMapper;
import com.thinker.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/24.
 */
@Component
public class TagServiceImpl implements TagService {

    @Autowired
    private TagMapper tagMapper;

    //添加标签
    @Override
    public void addTag(String tagContent){
        tagMapper.insertTag(tagContent);
    }

    //删除标签
    @Override
    public void deleteTag(int tagId){
        tagMapper.deleteTag(tagId);
    }

    //查找所有标签
    @Override
    public List<Tag> findAllTag(){
        return tagMapper.findAllTag();
    }

}
