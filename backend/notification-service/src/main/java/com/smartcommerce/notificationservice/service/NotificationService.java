package com.smartcommerce.notificationservice.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.smartcommerce.notificationservice.entity.Notification;
import com.smartcommerce.notificationservice.repository.NotificationRepository;

@Service
public class NotificationService {

	private NotificationRepository notificationRepository;

	public NotificationService(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}
	
	public void saveNotification(Long orderId) {

        Notification notification = new Notification();

        notification.setOrderId(orderId);
        notification.setMessage("Payment successful for Order ID: " + orderId);
        notification.setStatus("SENT");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }
}
