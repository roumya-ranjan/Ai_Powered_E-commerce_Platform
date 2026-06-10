	package com.smartcommerce.paymentservice.event;
	
	public class PaymentSuccessEvent {
	
		private Long orderId;
	
	    public PaymentSuccessEvent() {
	    }
	
	    public PaymentSuccessEvent(Long orderId) {
	        this.orderId = orderId;
	    }
	
	    public Long getOrderId() {
	        return orderId;
	    }
	
	    public void setOrderId(Long orderId) {
	        this.orderId = orderId;
	    }
	}
