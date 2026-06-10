package com.smartcommerce.paymentservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smartcommerce.paymentservice.dto.PaymentRequest;
import com.smartcommerce.paymentservice.entity.Payment;
import com.smartcommerce.paymentservice.entity.PaymentStatus;
import com.smartcommerce.paymentservice.kafka.PaymentProducer;
import com.smartcommerce.paymentservice.repository.PaymentRepository;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

import com.smartcommerce.paymentservice.dto.RazorpayOrderRequest;
import com.smartcommerce.paymentservice.dto.RazorpayVerifyRequest;

@Service
public class PaymentService {

	private final PaymentRepository paymentRepository;
	
	private final RestTemplate restTemplate;
	
	private final PaymentProducer paymentProducer;
	
	@Value("${razorpay.key.id}")
	private String razorpayKeyId;

	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;

	public PaymentService(PaymentRepository paymentRepository,
							RestTemplate restTemplate, 
							PaymentProducer paymentProducer) {
		this.paymentRepository = paymentRepository;
		this.restTemplate =restTemplate;
		this.paymentProducer =paymentProducer;
	}
	
	public String createPayment(PaymentRequest request) {

		paymentProducer.publishPaymentSuccess(request.getOrderId());

	    Payment payment = new Payment();

	    payment.setOrderId(request.getOrderId());
	    payment.setAmount(request.getAmount());
	    payment.setPaymentMethod(request.getPaymentMethod());
	    payment.setPaymentStatus(PaymentStatus.SUCCESS);
	    payment.setTransactionId(UUID.randomUUID().toString());
	    payment.setCreatedAt(LocalDateTime.now());

	    paymentRepository.save(payment);

	    return "Payment completed successfully";
	}
	
	public List<Payment> getAllPayments() {
	    return paymentRepository.findAll();
	}

	public Payment getPaymentById(Long id) {
	    return paymentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Payment not found"));
	}
	
	public String createRazorpayOrder(RazorpayOrderRequest request) {

	    try {

	        RazorpayClient razorpayClient =
	                new RazorpayClient(razorpayKeyId, razorpayKeySecret);

	        int amountInPaise =
	                request.getAmount()
	                       .multiply(BigDecimal.valueOf(100))
	                       .intValue();

	        JSONObject orderRequest = new JSONObject();

	        orderRequest.put("amount", amountInPaise);
	        orderRequest.put("currency", "INR");
	        orderRequest.put("receipt",
	                "order_" + request.getOrderId());

	        com.razorpay.Order razorpayOrder =
	                razorpayClient.orders.create(orderRequest);

	        return razorpayOrder.toString();

	    } catch (Exception e) {
	        throw new RuntimeException(
	                "Failed to create Razorpay order : "
	                        + e.getMessage());
	    }
	}
}
