package com.thinker.util;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

/**
 * Created by LJ on 2017/4/28.
 */
public class DateConverter implements Converter<String,Date> {

    @Override
    public Date convert(String s){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return new java.sql.Date(simpleDateFormat.parse(s).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
