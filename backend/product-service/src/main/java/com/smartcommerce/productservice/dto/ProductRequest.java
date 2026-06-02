package com.smartcommerce.productservice.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProductRequest {

	@NotBlank(message ="Product name is required")
	private String name;
	
	private String description;
	
	@NotNull(message = "Price is required")
	@DecimalMin(value ="0.0", inclusive = false, message="Price must be greater then zero")
	private BigDecimal price;
	
	@NotNull(message="Stock quantity is required")
	@PositiveOrZero(message = "Stock quantity cannot be negative")
	private Integer stockQuantity;
	
	@NotBlank(message ="category is required")
	private String category;
	
	private String imageUrl;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getStockQuantity() {
		return stockQuantity;
	}

	public void setStockQuantity(Integer stockQuantity) {
		this.stockQuantity = stockQuantity;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
