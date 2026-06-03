package com.smartcommerce.paymentservice.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.smartcommerce.paymentservice.event.PaymentSuccessEvent;

@Service
public class PaymentProducer {

	private final KafkaTemplate<String, PaymentSuccessEvent> kafkaTemplate;

    public PaymentProducer(KafkaTemplate<String, PaymentSuccessEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishPaymentSuccess(Long orderId) {

        PaymentSuccessEvent event =
                new PaymentSuccessEvent(orderId);

        kafkaTemplate.send("payment-success-topic", event);
    }
}
