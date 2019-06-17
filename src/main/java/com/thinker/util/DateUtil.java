package com.thinker.util;

import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by LJ on 2017/4/28.
 */
public class DateUtil {

    public static java.sql.Timestamp getCurrentTime(){
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance();
        String dateTime = dateFormat.format(date);
        System.out.println(dateTime);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        ParsePosition position = new ParsePosition(0);
        date = simpleDateFormat.parse(dateTime,position);
        return new java.sql.Timestamp(date.getTime());
    }
}
