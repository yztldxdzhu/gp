package com.thinker.util.exception;

public class MessageException extends RuntimeException{ 

	private static final long serialVersionUID = 1L;
	private boolean isShow = true;
	public MessageException(String msg) {
		super(msg);
	}
	public String getMsg(){
		return isShow?getMessage():"";
	}
}
