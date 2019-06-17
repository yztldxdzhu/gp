package com.thinker.util.string;

/**
 * @author lzh
 * @note 字符串的拼接等
 */
public class MyStringUtil {

    /**
     * 把字符串的第一个字符转化成大写
     * @param str
     * @return
     */
    public static String convertFirstToCap(String str) {
        if (null == str || "".equals(str)) return null;
        char[] chars = str.toCharArray();
        chars[0] = Character.toUpperCase(chars[0]);
        return new String(chars);
    }

    /**
     * 转化成得到set与get方法
     * @param name
     * @param type
     * @return
     * @throws Exception
     */
    public static String convertToGetOrSet(String name, String type) throws Exception {
        StringBuilder stringBuffer = new StringBuilder();
        if ("get".equalsIgnoreCase(type)) {
            stringBuffer.append(type);
        } else if ("set".equalsIgnoreCase(type)) {
            stringBuffer.append(type);
        } else {
            throw new Exception(type + " is error");
        }
        stringBuffer.append(convertFirstToCap(name));
        return stringBuffer.toString();
    }

    public static String[] splitToArray(String str){
        if (!CheckString.checkMulti(str)) return null;
        str = str.substring(1,str.length()-1);
        return str.split(",");
    }


}
