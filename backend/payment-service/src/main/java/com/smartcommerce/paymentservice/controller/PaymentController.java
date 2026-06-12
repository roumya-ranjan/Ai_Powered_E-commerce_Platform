package com.smartcommerce.paymentservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcommerce.paymentservice.dto.PaymentRequest;
import com.smartcommerce.paymentservice.entity.Payment;
import com.smartcommerce.paymentservice.service.PaymentService;

import com.smartcommerce.paymentservice.dto.RazorpayOrderRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
	
	private final PaymentService paymentService;
	
	public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
	
	@GetMapping("/health")
	public String health() {
	    return "Payment Service Running";
	}

    @PostMapping
    public String createPayment(@Valid @RequestBody PaymentRequest request) {
        return paymentService.createPayment(request);
    }
    
    @PostMapping("/create-order")
    public String createRazorpayOrder(
            @RequestBody RazorpayOrderRequest request) {

        return paymentService.createRazorpayOrder(request);
    }
    
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }
}

