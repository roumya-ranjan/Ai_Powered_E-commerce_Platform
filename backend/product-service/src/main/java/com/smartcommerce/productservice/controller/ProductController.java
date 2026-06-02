package com.smartcommerce.productservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartcommerce.productservice.dto.ProductRequest;
import com.smartcommerce.productservice.entity.Product;
import com.smartcommerce.productservice.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	private final ProductService productService;
	
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	@PostMapping
	public String addProduct(@Valid @RequestBody ProductRequest request) {
		return productService.addProduct(request);
	}
	
	@GetMapping
	public List<Product> getAllProducts() {
	    return productService.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
	    return productService.getProductById(id);
	}
	
	@PutMapping("/{id}")
	public String updateProduct(@PathVariable Long id,
	                            @Valid @RequestBody ProductRequest request) {
	    return productService.updateProduct(id, request);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable Long id) {
	    return productService.deleteProduct(id);
	}
	
	@PutMapping("/{id}/reduce-stock")
	public String reduceStock(@PathVariable Long id,
	                          @RequestParam Integer quantity) {
	    return productService.reduceStock(id, quantity);
	}

}
