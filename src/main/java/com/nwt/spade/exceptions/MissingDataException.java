package com.nwt.spade.exceptions;

public class MissingDataException extends Exception {

	private final String message;
	
	public MissingDataException(String m) {
		message=m;
	}
	
	@Override
	public String getLocalizedMessage() {
		return "Looks like you're missing something: " + message;
	}
	
	public String message(){
		return message;
	}
	
}
