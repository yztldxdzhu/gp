package com.thinker.util;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author lzh
 */
public class HttpServlet {

    /**
     *
     * @return request
     */
    public static HttpServletRequest getRequest(){
        return  ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getRequest();
    }

    /**
     *
     * @return response
     */
    public static HttpServletResponse getResponse(){
        return ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getResponse();
    }
}
