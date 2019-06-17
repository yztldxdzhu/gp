package com.thinker.util.string;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author lzh
 */
public class CheckString {
    /**
     *
     * @param str 传入字符串，node里面的值
     * @return 是否是多个参数
     */
    public static boolean checkMulti(String str){
        if ((null == str) || (str.length()<= 2)) return false;
        int index = str.indexOf(",");
        boolean flag = str.startsWith("{") && str.endsWith("}") && (index >= 0);
        return flag;
    }

    public static boolean checkSingle(String str){
        if(null == str || (str.length() < 1)) return false;
        boolean flag = (!str.contains("{")) && (!str.contains("}")) && (!str.contains(","));
        return flag;
    }

    /**
     *
     * @param str string
     * @param regex regex
     * @return boolean
     * @since 1.1
     * @see StringRegex
     * 这个方法可以用来代替上面的两个方法，项目中还没有代替，以后换。
     */
    public static boolean checkByRegex(String str,String regex){
        if ((null == str) || (str.length()<= 1)) return false;
        if((null == regex) || (regex.length() <= 1))
            throw  new NullPointerException("regex is null");//应当抛出异常
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        if(matcher.find()){
            return true;
        }else {
            return false;
        }
    }
}
