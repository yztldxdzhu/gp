package com.thinker.redis;

import com.thinker.util.SerializeUtil;
import com.thinker.util.annotation.Intercept;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * 拦截需要缓存方法
 * Created by Asus on 2016/11/4.
 */

public class MethodCacheInterceptor implements MethodInterceptor {
    private static Logger logger = Logger.getLogger(MethodCacheInterceptor.class);
    private RedisUtils redisUtil;
    private List<String> targetNameList;  //不加入缓存的service名称
    private List<String> methodNameList;  //不加入缓存的方法名称
    private Long defaultCacheExpireTime;  //缓存默认过期时间

    private final Long questionCacheExpireTime = 3000l;  //缓存问题过期时间

    public MethodCacheInterceptor(){
        InputStream in = MethodCacheInterceptor.class.getResourceAsStream("/redis.properties");
        Properties p = new Properties();
        try {
            p.load(in);
            String[] targetArray = p.get("targetNames").toString().split(",");
            String[] methodArray = p.get("methodNames").toString().split(",");
            defaultCacheExpireTime = Long.valueOf((String)p.get("defaultCacheExpireTime"));
            //创建list
            targetNameList = new ArrayList<>(targetArray.length);
            methodNameList = new ArrayList<>(methodArray.length);
            int maxLen = targetArray.length > methodArray.length ? targetArray.length : methodArray.length;
            //将不需要缓存的类名或者方法名添加到list中
            for (int i = 0; i < maxLen; i++) {
                if (i < targetArray.length) {
                    targetNameList.add(targetArray[i]);
                }
                if (i < methodArray.length) {
                    methodNameList.add(methodArray[i]);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Object invoke(MethodInvocation methodInvocation) throws Throwable {
        Object value = null;
        String targetName = methodInvocation.getThis().getClass().getName();
        String methodName = methodInvocation.getMethod().getName();
        Method method = methodInvocation.getMethod();
        if(!method.isAnnotationPresent(Intercept.class)){
            if(isCacheMethod(targetName,methodName))
                methodNameList.add(method.getName());
        }
        Object arguments[] = methodInvocation.getArguments();
        if(isCacheMethod(targetName,methodName)){
            String key = getCacheKey(targetName,methodName,arguments);
            logger.info("类"+targetName+"加"+methodName+"，得到key值为："+key);
            if(isExist(key)){
                return redisUtil.get(key);
            }
            value = methodInvocation.proceed();
            if(value != null){
                if(methodName.equals("findNewQuestion")){
                    redisUtil.set(key, value,questionCacheExpireTime);
                }else{
                    redisUtil.set(key,value,defaultCacheExpireTime);
                }
            }
        }
        return methodInvocation.proceed();
    }

    //判断方法是否需要缓冲
    private boolean isCacheMethod(String targetName,String methodName){
        if(targetNameList.contains(targetName) || methodNameList.contains(methodName)){
            return false;
        }
        return true;
    }

    //构建key值
    private String getCacheKey(String targetName,String methodName,Object arguments[]){
        StringBuffer keyStringBuffer = new StringBuffer();
        keyStringBuffer.append(targetName).append("_").append(methodName);
        for(Object argument:arguments){
            keyStringBuffer.append("_").append((String)argument);
        }
        return keyStringBuffer.toString();
    }

    //判断缓存数据库里是否存在key缓存
    private boolean isExist(String key){
       return redisUtil.exists(key);
    }

    public void setRedisUtil(RedisUtils redisUtil){
        this.redisUtil = redisUtil;
    }
}