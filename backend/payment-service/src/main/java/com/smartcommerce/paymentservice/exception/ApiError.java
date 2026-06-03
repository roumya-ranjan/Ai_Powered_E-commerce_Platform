package com.smartcommerce.paymentservice.exception;

import java.time.LocalDateTime;

public class ApiError {

	private int status;
	
	private String message;
	
	private LocalDateTime timestamo;

	public ApiError() {
		super();
	}

	public ApiError(int status, String message, LocalDateTime timestamo) {
		this.status = status;
		this.message = message;
		this.timestamo = timestamo;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTimestamo() {
		return timestamo;
	}

	public void setTimestamo(LocalDateTime timestamo) {
		this.timestamo = timestamo;
	}
	

}
