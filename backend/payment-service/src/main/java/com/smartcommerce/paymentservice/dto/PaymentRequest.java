package com.smartcommerce.paymentservice.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PaymentRequest {
	
	@NotNull(message = "Order ID is required")
	private Long orderId;
	
	@NotNull(message ="Amount is required")
	@Positive(message ="Amount must be greater than zero")
	private BigDecimal amount;
	
	@NotBlank(message ="Payment method is required")
	private String paymentMethod;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

}
