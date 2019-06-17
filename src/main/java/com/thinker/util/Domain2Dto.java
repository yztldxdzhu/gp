package com.thinker.util;


import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * Created by LJ on 2017/4/28.
 */
public class Domain2Dto {
    private Object obj;
    private Object objDto;

    public Object dtoToDomain(Object objDto,Object obj){
        this.obj = obj;
        this.objDto = objDto;
        Class<?> objDtoClass = objDto.getClass();
        Field[] fields = objDtoClass.getDeclaredFields();

        for(Field field:fields){
            invoke(field);
        }
        return this.obj;
    }

    private void invoke(Field field){
        String getMethodName = "get"+Character.toUpperCase(field.getName().charAt(0))+field.getName().substring(1);
        String setMethodName = "set"+Character.toUpperCase(field.getName().charAt(0))+field.getName().substring(1);
        try{
            Method setMethod = this.obj.getClass().getMethod(setMethodName,field.getType());
            Method getMethod = this.objDto.getClass().getMethod(getMethodName);
            setMethod.invoke(this.obj,getMethod.invoke(objDto));
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public  Object domainToDto(Object obj,Object objDto){
       return dtoToDomain(objDto,obj);
    }
}
