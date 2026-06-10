package com.smartcommerce.orderservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartcommerce.orderservice.dto.OrderRequest;
import com.smartcommerce.orderservice.entity.Order;
import com.smartcommerce.orderservice.entity.OrderStatus;
import com.smartcommerce.orderservice.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@Valid @RequestBody OrderRequest request) {
        try {
            Order order = orderService.placeOrder(request);
            return ResponseEntity.ok(order);  
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getAllOrders().stream()
                .filter(o -> o.getUserId().equals(userId))
                .toList();
    }
    
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
    
    @PutMapping("/{id}/status")
    public String updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return orderService.updateOrderStatus(id, status);
    }

}
