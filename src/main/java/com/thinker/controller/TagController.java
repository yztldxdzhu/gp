package com.thinker.controller;

import com.thinker.domain.Tag;
import com.thinker.service.TagService;
import com.thinker.util.MsgGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 标签管理
 * Created by LJ on 2017/4/24.
 */
@Controller
@RequestMapping(value="/tag")
public class TagController extends BaseController {
    @Autowired
    private TagService tagService;

    //添加标签
    @RequestMapping(value="/addTag")
    @ResponseBody
    public Map<String,Object> addTag(@RequestParam String tagContent){
        tagService.addTag(tagContent);
        return generateSuccessMsg("标签添加成功！");
    }

    //删除标签
    @RequestMapping(value="/deleteTag")
    @ResponseBody
    public Map<String,Object> deleteTag(@RequestParam Integer tagId){
        tagService.deleteTag(tagId);
        return generateSuccessMsg("标签删除成功！");
    }

    //查找所有标签
    @RequestMapping(value="/findAllTag")
    @ResponseBody
    public Map<String,Object> findAllTag(){
        List<Tag> tagList = tagService.findAllTag();
        return MsgGenerate.bindMapMsg("tagList",tagList);
    }
}
