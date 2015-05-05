package com.nwt.spade.exceptions;

public class ResourceNotFoundException extends Exception {

	private final String message;
	
	public ResourceNotFoundException(String m) {
		message=m;
	}
	
	@Override
	public String getLocalizedMessage() {
		return "The resource requested could not be found: " + message;
	}
	
	public String message(){
		return message;
	}
	
}
