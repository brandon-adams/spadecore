package com.nwt.spade.exceptions;

public class DuplicateDBEntryException extends Exception {

	private final String message;
	
	public DuplicateDBEntryException(String m) {
		message=m;
	}
	
	@Override
	public String getLocalizedMessage() {
		return "There appears to be a duplicate DB entry: " + message;
	}
	
	public String message(){
		return message;
	}
	
}
