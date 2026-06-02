package com.smartcommerce.paymentservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartcommerce.paymentservice.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
