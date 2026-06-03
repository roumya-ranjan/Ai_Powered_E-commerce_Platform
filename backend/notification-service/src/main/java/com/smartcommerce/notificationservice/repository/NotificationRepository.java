package com.smartcommerce.notificationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartcommerce.notificationservice.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

}
