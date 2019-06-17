package com.thinker.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hao on 17/4/1.
 */
public class MsgGenerate {
    public static Map<String, Object> getMap() {
        return new HashMap<>();
    }

    public static Map<String, Object> getSuccessMap(String msg) {
        Map<String, Object> map = getMap();
        map.put("isOk", true);
        map.put("msg", msg);
        return map;
    }

    public static Map<String, Object> getSuccessMap() {
        return getSuccessMap("");
    }

    public static Map<String, Object> bindMapMsg(String str,Object object) {
        Map<String,Object> map = getMap();
        map.put(str,object);
        return map;
    }

    public static Map<String, Object> getErrorMap(String msg) {
        Map<String, Object> map = getMap();
        map.put("isOk", false);
        map.put("msg", msg);
        return map;
    }

    public static Map<String, Object> getErrorMap() {
        return getErrorMap("");
    }

}
