package com.smartcommerce.productservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartcommerce.productservice.dto.ProductRequest;
import com.smartcommerce.productservice.entity.Product;
import com.smartcommerce.productservice.repository.ProductRepository;

@Service
public class ProductService {

	
	private final ProductRepository productRepository;
	
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public String addProduct(ProductRequest request) {

	    Product product = new Product();

	    product.setName(request.getName());
	    product.setDescription(request.getDescription());
	    product.setPrice(request.getPrice());
	    product.setStockQuantity(request.getStockQuantity());
	    product.setCategory(request.getCategory());
	    product.setImageUrl(request.getImageUrl());
	    product.setCreatedAt(LocalDateTime.now());
	    product.setUpdatedAt(LocalDateTime.now());

	    productRepository.save(product);

	    return "Product added successfully";
	}
	
	public List<Product> getAllProducts() {
	    return productRepository.findAll();
	}	
	
	public Product getProductById(Long id) {
	    return productRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Product not found"));
	}
	
	public String updateProduct(Long id, ProductRequest request) {

	    Product product = productRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Product not found"));

	    product.setName(request.getName());
	    product.setDescription(request.getDescription());
	    product.setPrice(request.getPrice());
	    product.setStockQuantity(request.getStockQuantity());
	    product.setCategory(request.getCategory());
	    product.setImageUrl(request.getImageUrl());
	    product.setUpdatedAt(LocalDateTime.now());

	    productRepository.save(product);

	    return "Product updated successfully";
	}
	
	public String deleteProduct(Long id) {

	    if (!productRepository.existsById(id)) {
	        throw new RuntimeException("Product not found");
	    }

	    productRepository.deleteById(id);

	    return "Product deleted successfully";
	}
	
	public String reduceStock(Long productId, Integer quantity) {

	    Product product = productRepository.findById(productId)
	            .orElseThrow(() -> new RuntimeException("Product not found"));

	    if (product.getStockQuantity() < quantity) {
	        throw new RuntimeException("Insufficient stock");
	    }

	    product.setStockQuantity(product.getStockQuantity() - quantity);
	    product.setUpdatedAt(LocalDateTime.now());

	    productRepository.save(product);

	    return "Stock updated successfully";
	}
}
