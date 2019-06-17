package com.thinker.util.sendMsgUtil;

import com.thinker.util.exception.MessageException;
import net.sf.json.JSONObject;

/**
 * 发送短信验证码
 * Created by LJ on 2017/4/7.
 */
public class SendMsg {
    private static final String apiKey = "85a92774e8137f46ac3e9f84c256fa3f";

    public static int sendUserCode(String msg,String mobile){
        String responseMsg = JavaMsgApi.sendMsg(apiKey,msg,mobile);
        int code = Integer.parseInt(JSONObject.fromObject(responseMsg).get("code").toString());

        if(code == 10){
            throw new MessageException("该号码已经进入黑名单！");
        }else if(code == 17){
            throw new MessageException("24小时内该手机号获取验证码次数超过限制！");
        }else if(code == -51){
            throw new MessageException("系统繁忙，请稍后再试！");
        }
        return code;
    }
}
