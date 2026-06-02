package com.smartcommerce.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartcommerce.productservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	

}
