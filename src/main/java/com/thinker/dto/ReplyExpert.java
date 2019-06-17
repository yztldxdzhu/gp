package com.thinker.dto;

import java.io.Serializable;

/**
 * Created by LJ on 2017/5/22.
 */
public class ReplyExpert implements Serializable {

    private int expertId;

    private String expertName;

    public int getExpertId() {
        return expertId;
    }

    public void setExpertId(int expertId) {
        this.expertId = expertId;
    }

    public String getExpertName() {
        return expertName;
    }

    public void setExpertName(String expertName) {
        this.expertName = expertName;
    }
}
