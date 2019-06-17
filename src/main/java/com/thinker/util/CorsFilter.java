package com.thinker.util;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 跨域管理
 * Created by LJ on 2017/4/27.
 */
public class CorsFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        httpResponse.addHeader("Access-Control-Allow-Origin", "http://localhost:8888");//方便前端跨域访问
        httpResponse.addHeader("Access-Control-Allow-Methods","*");
        httpResponse.addHeader("Access-Control-Allow-Headers","content-type,*");
        httpResponse.addHeader("Access-Control-Allow-Credentials","true");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
