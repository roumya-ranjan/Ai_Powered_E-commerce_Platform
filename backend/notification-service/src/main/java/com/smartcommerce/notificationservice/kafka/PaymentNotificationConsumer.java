package com.smartcommerce.notificationservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.smartcommerce.notificationservice.service.NotificationService;
import com.smartcommerce.paymentservice.event.PaymentSuccessEvent;

@Service
public class PaymentNotificationConsumer {

	private final NotificationService notificationService;

	public PaymentNotificationConsumer(NotificationService notificationService) {
		this.notificationService = notificationService;
	}
	
	@KafkaListener(
            topics = "payment-success-topic",
            groupId = "notification-service-group"
    )
    public void consumePaymentSuccess(PaymentSuccessEvent event) {

        notificationService.saveNotification(event.getOrderId());

        System.out.println("Notification saved for orderId: "
                + event.getOrderId());
    }
}
