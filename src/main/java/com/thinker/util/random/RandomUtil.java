package com.thinker.util.random;

/**
 * Created by LJ on 2017/4/25.
 */
public class RandomUtil {

    //产生六位随机数字
    public static String createRandom(){
        int startNumber = 100000;
        int endNumber = 999999;
        Integer randomNumber = startNumber + (int)(Math.random()*(endNumber - startNumber));
        return randomNumber.toString();
    }

    //生成15位订单编码
    public static String createOrderNumber(){
        return (System.currentTimeMillis()+"").substring(1)+(System.nanoTime()+"").substring(7,10);
    }
}
