package com.thinker.util.user;

import com.thinker.domain.Expert;
import com.thinker.domain.User;
import com.thinker.util.exception.MessageException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.io.File;


public class SessionUtil {

	/**
	 * 得到session对象
	 * @return
	 * @throws MessageException
	 */
	public static HttpSession getSession(){
		ServletRequestAttributes attr = (ServletRequestAttributes)  RequestContextHolder.currentRequestAttributes(); 
		HttpSession session = attr.getRequest().getSession();
		if(session==null){
			throw new MessageException("session不存在！");
		}
		return session;
	}
	public static void bindSession(String str,Object obj){
		getSession().setAttribute(str, obj);
	}

	public static void logoutSession(String str){
		getSession().setAttribute(str, null);
	}

	public static String getCurrentPath(){
		return getSession().getServletContext().getRealPath("/");
	}

	public static User getCurrentUser(){
		return (User)getSession().getAttribute("user");
	}

	public static Expert getCurrentExpert(){return (Expert) getSession().getAttribute("expert");}

	public static File getWebappPath(){
		File file = new File(getCurrentPath());
		return file.getParentFile();
	}

}
