package com.thinker.util.string;

/**
 * @author lzh
 * 项目中要用到的正则表达式，以后有时间写一个类读取配置文件，把正则表达式放到配置文件里面
 */
public final class StringRegex {

    public static final String isMulti = "(^\\{)(.)(.*),(.)(.*)(\\}$)";

    //只适合长度大于1的字符串
    public static final String isSingle = "(^[^\\{])([^\\{\\},]{0,})([^\\}]$)";
}
