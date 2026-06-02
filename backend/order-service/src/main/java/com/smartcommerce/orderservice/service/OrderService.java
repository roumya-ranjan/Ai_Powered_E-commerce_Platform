package com.smartcommerce.orderservice.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smartcommerce.orderservice.dto.OrderRequest;
import com.smartcommerce.orderservice.dto.ProductResponse;
import com.smartcommerce.orderservice.entity.Order;
import com.smartcommerce.orderservice.entity.OrderStatus;
import com.smartcommerce.orderservice.repository.OrderRepository;

@Service
public class OrderService {

	
	public final OrderRepository orderRepository;
	
	private final RestTemplate restTemplate;
	
	public OrderService(OrderRepository orderrepository, RestTemplate restTemplate) {
		this.orderRepository = orderrepository;
		this.restTemplate = restTemplate;
	}
	
	public String placeOrder(OrderRequest request) {

	    Order order = new Order();

	    order.setUserId(request.getUserId());
	    order.setProductId(request.getProductId());
	    order.setQuantity(request.getQuantity());

	    ProductResponse productResponse = restTemplate.getForObject(
	            "http://PRODUCT-SERVICE/api/products/" + request.getProductId(),
	            ProductResponse.class
	    );

	    if (productResponse == null) {
	        throw new RuntimeException("Product not found");
	    }

	    BigDecimal totalAmount = productResponse.getPrice().multiply(
	            BigDecimal.valueOf(request.getQuantity())
	    );

	    order.setTotalAmount(totalAmount);
	    order.setOrderStatus(OrderStatus.PLACED);
	    order.setCreatedAt(LocalDateTime.now());

	    orderRepository.save(order);

	    return "Order placed successfully";
	}
	
	public List<Order> getAllOrders() {
	    return orderRepository.findAll();
	}
	
	public Order getOrderById(Long id) {
	    return orderRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Order not found"));
	}
}
