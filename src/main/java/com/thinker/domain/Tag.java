package com.thinker.domain;

import com.thinker.dto.ReplyExpert;

import java.util.Date;

/**
 * Created by LJ on 2017/4/24.
 */
public class Tag {

    private int tagId;

    private String tagContent;

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public String getTagContent() {
        return tagContent;
    }

    public void setTagContent(String tagContent) {
        this.tagContent = tagContent;
    }

}
