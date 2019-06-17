package com.thinker.redis;

import org.apache.log4j.Logger;
import org.springframework.data.redis.core.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * redis cache工具类
 * Created by Asus on 2016/11/4.
 */
public class RedisUtils<T> {

    private static Logger logger =Logger.getLogger(RedisUtils.class);
    private RedisTemplate<Serializable,T> redisTemplate;
    public void setRedisTemplate(RedisTemplate<Serializable,T> redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    /**
     * redis 基本操作
     */
    public void remove(final String... keys){
        logger.info("删除keys："+keys.toString());
        for(String key:keys){
            remove(key);
        }
    }

    public void remove(final String key){
        if(exists(key))
        redisTemplate.delete(key);
    }

    public boolean setExpireTime(String key,long timeOut,TimeUnit timeUnit){
        return redisTemplate.expire(key,timeOut,timeUnit);
    }

    public void reName(String oldName,String newName){
        logger.info("把key"+oldName+"更名为："+newName);
        redisTemplate.rename(oldName,newName);
    }

    public boolean exists(final String key){
        boolean result = redisTemplate.hasKey(key);
        logger.info(key+"是否存在："+result);
        return result;
    }

    /**
     * 字符串操作
     */
    public T get(final String key){
        ValueOperations<Serializable,T> operations = redisTemplate.opsForValue();
        return operations.get(key);
    }

    public boolean set(final String key,T value){
        boolean result = false;
        try{
            ValueOperations<Serializable,T> operations = redisTemplate.opsForValue();
            operations.set(key,value);
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public boolean set(final String key,T value,Long expireTime){
        boolean result = false;
        try{
            ValueOperations<Serializable,T> operations = redisTemplate.opsForValue();
            operations.set(key,value);
            setExpireTime(key,expireTime,TimeUnit.SECONDS);
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 有序集合的操作
     */
    //添加缓存数据
    public void setSortedSet(final String key,T value,double score){
        BoundZSetOperations<Serializable,T> boundZSetOperations = redisTemplate.boundZSetOps(key);
        boundZSetOperations.add(value,score);
    }

    //为value的score添加权重
    public void incrementInSortedSet(final String key,T value,int increment){
        BoundZSetOperations<Serializable,T> boundZSetOperations = redisTemplate.boundZSetOps(key);
        boundZSetOperations.incrementScore(value,increment);
    }

    //清除key中的所有数据
    public void clearSortedSet(final String key){
        BoundZSetOperations<Serializable,T> boundZSetOperations = redisTemplate.boundZSetOps(key);
        boundZSetOperations.removeRange(0,-1);
    }

    //得到权重
    public double getScoreInSortedSet(final String key,T value){
        BoundZSetOperations<Serializable,T> boundZSetOperations = redisTemplate.boundZSetOps(key);
        Double score = boundZSetOperations.score(value);
        if(score == null){
            setSortedSet(key,value,0);
            return 0;
        }
        return score;
    }

    //得到一定范围的对象，flag为true表示正序，false表示反序
    public List<T> getRangeInSortedSet(final String key,int begin,int end,boolean flag){
        List<T> valueList = new ArrayList<>();
        Set<ZSetOperations.TypedTuple<T>> sets = null;
        BoundZSetOperations<Serializable,T> boundZSetOperations = redisTemplate.boundZSetOps(key);
        sets = flag ? boundZSetOperations.rangeWithScores(begin,end) : boundZSetOperations.reverseRangeWithScores(begin,end);
        if(sets != null){
            for(ZSetOperations.TypedTuple<T> set:sets){
                valueList.add(set.getValue());
            }
            return valueList;
        }
        return null;
    }

    /**
     * 无序集合操作
     */
    public void setUnorderSet(final String key,T value){
        BoundSetOperations<Serializable,T> boundSetOperations = redisTemplate.boundSetOps(key);
        boundSetOperations.add(value);
    }

    public Boolean isUnorderSetMember(String key, T value){
        BoundSetOperations<Serializable, T> boundZSetOperations = redisTemplate.boundSetOps(key);
        return boundZSetOperations.isMember(value);
    }

    public Long getSizeUnorderSet(String key){
        BoundSetOperations<Serializable, T> boundZSetOperations = redisTemplate.boundSetOps(key);
        return boundZSetOperations.size();
    }

    public void clearUnorderSet(String key){
        BoundSetOperations<Serializable, T> boundZSetOperations = redisTemplate.boundSetOps(key);
        Set<T> set = boundZSetOperations.members();
        boundZSetOperations.remove(set);
    }

    /**
     * 列表操作
     */
    public void pushListOps(final String key,T value){
        BoundListOperations<Serializable,T> boundListOperations = redisTemplate.boundListOps(key);
        boundListOperations.rightPush(value);
    }

    public List<T> getRangeListOps(final String key,int begin,int end){
        BoundListOperations<Serializable,T> boundListOperations = redisTemplate.boundListOps(key);
        return boundListOperations.range(begin,end);
    }

    public T getObjectInList(final String key,int index){
        BoundListOperations<Serializable,T> boundListOperations = redisTemplate.boundListOps(key);
        return boundListOperations.index(index);
    }

}
