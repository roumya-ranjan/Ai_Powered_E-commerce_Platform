package com.smartcommerce.orderservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.smartcommerce.orderservice.entity.OrderStatus;
import com.smartcommerce.paymentservice.event.PaymentSuccessEvent;
import com.smartcommerce.orderservice.service.OrderService;

@Service
public class PaymentConsumer {

	private final OrderService orderService;

    public PaymentConsumer(OrderService orderService) {
        this.orderService = orderService;
    }

    @KafkaListener(
            topics = "payment-success-topic",
            groupId = "order-service-group-v3"
    )
    public void consumePaymentSuccess(PaymentSuccessEvent event) {

        try {
            orderService.updateOrderStatus(
                    event.getOrderId(),
                    OrderStatus.PROCESSING
            );

            System.out.println("Order status updated through Kafka for orderId: "
                    + event.getOrderId());

        } catch (Exception e) {
            System.out.println("Kafka event failed for orderId: "
                    + event.getOrderId()
                    + " because: "
                    + e.getMessage());
        }
    }
}
