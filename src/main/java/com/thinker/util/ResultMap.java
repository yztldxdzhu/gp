package com.thinker.util;

import com.thinker.util.exception.MessageException;
import com.thinker.util.string.StringUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @author lzh
 */
public class ResultMap {

    public static Map<String, Object> generateFailureMsg(Exception e, String defaultMsg) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (e instanceof MessageException) {
            map.put("msg", ((MessageException) e).getMsg());
        } else if (!StringUtil.isEmpty(defaultMsg)) {
            map.put("msg", defaultMsg);
        }
        map.put("success", false);
        e.printStackTrace();
        return map;
    }

    public static Map<String, Object> generateFailureMsg(String defaultMsg) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (!StringUtil.isEmpty(defaultMsg)) {
            map.put("msg", defaultMsg);
            map.put("success", false);
        }
        return map;
    }

    public static Map<String, Object> generateSuccessMsg(String defaultMsg) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", defaultMsg);
        map.put("success", true);
        return map;
    }
}
