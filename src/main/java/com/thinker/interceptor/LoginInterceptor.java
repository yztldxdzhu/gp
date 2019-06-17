package com.thinker.interceptor;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import com.thinker.util.user.SessionUtil;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 登陆拦截
 * Created by LJ on 2017/4/27.
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object handler) throws IOException {
        User user = null;
        try {
             user = SessionUtil.getCurrentUser();
        }catch (Exception e){
            e.printStackTrace();
        }
        if(!(request.getRequestURI().contains("/userLogin") || request.getRequestURI().contains("/userTelCheck") || request.getRequestURI().contains("/userRegister") || request.getRequestURI().contains("/sendCode") || request.getRequestURI().contains("/validateCode"))){
            if(user == null){
                Map<String,Object> map = new HashMap<>();
                map.put("success",false);
                map.put("mag","用户未登录，请登录！");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().print(map);
                return false;
            }
        }
        return true;
    }
}
