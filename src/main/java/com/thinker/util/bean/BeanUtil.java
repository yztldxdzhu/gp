package com.thinker.util.bean;


import com.thinker.util.user.SessionUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 *
 */
public class BeanUtil {
	private static ApplicationContext appContext;
	public static Object load(String name){
		if(appContext==null){
			appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(
					SessionUtil.getSession().getServletContext());
		} 
		return appContext.getBean(name);
	}
}
