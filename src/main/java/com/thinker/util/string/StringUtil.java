package com.thinker.util.string;


import java.util.Random;

public class StringUtil {
    /**
     * 判断字符串是否为空
     * @param str
     * @return 是否为空
     * **/
    public static boolean isEmpty(String str){
        if(str == null || "".equals(str)){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 如果字符串对象等于null转换非空""，否则不变
     * @param str
     * @return
     */
    public static String swapNull(String str){
        return str == null?"":str;
    }

    public static String getRandom(int num){
        if(num < 1) return null;
        Random random = new Random();
        StringBuilder stringBuffer = new StringBuilder();
        for(int i=0;i<num;i++){
            stringBuffer.append(random.nextInt(10));
        }
       return stringBuffer.toString();
    }
}

