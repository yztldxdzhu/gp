package com.thinker.dto;

import java.io.Serializable;

/**
 * Created by LJ on 2017/5/22.
 */
public class QuestionUser implements Serializable {

    private int userId;
    private String userName;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
