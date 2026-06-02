package com.smartcommerce.paymentservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smartcommerce.paymentservice.dto.PaymentRequest;
import com.smartcommerce.paymentservice.entity.Payment;
import com.smartcommerce.paymentservice.entity.PaymentStatus;
import com.smartcommerce.paymentservice.repository.PaymentRepository;

@Service
public class PaymentService {

	private final PaymentRepository paymentRepository;
	
	private final RestTemplate restTemplate;

	public PaymentService(PaymentRepository paymentRepository, RestTemplate restTemplate) {
		this.paymentRepository = paymentRepository;
		this.restTemplate =restTemplate;
	}
	
	public String createPayment(PaymentRequest request) {

	    restTemplate.put(
	            "http://ORDER-SERVICE/api/orders/"
	            + request.getOrderId()
	            + "/status?status=PROCESSING",
	            null
	    );

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
}
