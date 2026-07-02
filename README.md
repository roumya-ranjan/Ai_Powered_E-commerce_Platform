# 🛒 Smart E-Commerce Platform

A cloud-deployed enterprise-grade E-Commerce platform built using **Java Spring Boot Microservices** and **React.js**, designed to demonstrate modern backend architecture, secure authentication, distributed systems, and cloud deployment.

---

# 🚀 Live Demo

### 🌐 Frontend

https://ai-powered-e-commerce-platform.vercel.app

### 💻 Source Code

https://github.com/roumya-ranjan/Ai_Powered_E-commerce_Platform

---

# 📌 Project Highlights

* Microservices Architecture
* JWT Authentication & Authorization
* Role-Based Access Control (ADMIN / USER)
* API Gateway
* Eureka Service Discovery
* Event-Driven Communication with Kafka
* Redis Caching
* Payment Service Integration
* Dockerized Services
* Cloud Deployment
* Swagger API Documentation

---

# 🏗 System Architecture

```text
                    React Frontend
                           │
                           ▼
                    API Gateway
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   Auth Service    Product Service    Order Service
          │                │                │
          └────────┬───────┴────────┬───────┘
                   ▼                ▼
          Payment Service   Notification Service
                   │
                   ▼
            PostgreSQL (Neon)

          Eureka Service Discovery
                   │
          Kafka & Redis Integration
```

---

# 🔥 Features

## User Features

* User Registration
* User Login
* JWT Authentication
* Browse Products
* Product Details
* Add to Cart
* Place Orders
* Payment Processing

## Admin Features

* Admin Login
* Add Products
* Update Products
* Delete Products
* Inventory Management
* Order Management

---

# 🛠 Technology Stack

## Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Cloud
* Spring Data JPA
* Hibernate
* JWT
* Maven

## Microservices

* Eureka Server
* API Gateway
* Auth Service
* Product Service
* Order Service
* Payment Service
* Notification Service

## Database

* PostgreSQL (Neon)

## Messaging & Cache

* Apache Kafka
* Redis

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios

## DevOps & Cloud

* Docker
* Git
* GitHub
* Render
* Vercel

---

# 🔐 Security

* JWT Token Authentication
* Role-Based Authorization
* Protected REST APIs
* Spring Security Integration

---

# ⚙️ Microservices Workflow

## Authentication Flow

```text
User
   │
   ▼
React Frontend
   │
   ▼
API Gateway
   │
   ▼
Auth Service
   │
   ▼
PostgreSQL
   │
   ▼
JWT Token Generated
```

---

## Order & Payment Flow

```text
User
   │
   ▼
Order Service
   │
   ▼
Payment Service
   │
   ▼
Kafka Event
   │
   ▼
Notification Service
```

---

# 📂 Project Structure

```text
AI-Powered-Ecommerce-Platform

├── backend
│   ├── service-registry
│   ├── api-gateway
│   ├── auth-service
│   ├── product-service
│   ├── order-service
│   ├── payment-service
│   └── notification-service
│
├── frontend
│   └── smart-commerce-frontend
│
└── docker-compose.yml
```

---

# 🌐 Deployment

## Frontend

* Vercel

## Backend

* Render

## Database

* Neon PostgreSQL

---

# 📊 What I Learned

* Distributed System Design
* Spring Boot Microservices
* API Gateway Configuration
* Eureka Service Discovery
* JWT Security
* Kafka Event Processing
* Redis Caching
* Docker
* Cloud Deployment
* PostgreSQL Migration
* Production Debugging
* API Testing with Postman

---

# 🚀 Future Enhancements

* AI Product Recommendation Engine
* Cloudinary Image Upload
* Email Notification Service
* Elasticsearch
* CI/CD Pipeline
* Kubernetes Deployment
* AWS S3 Integration
* Admin Analytics Dashboard

---

# 📸 Application Screenshots

## Home Page
<img width="1366" height="608" alt="Homepage" src="https://github.com/user-attachments/assets/8ec4da44-368f-4968-b015-bfcd6f60cfcb" />

## Login
<img width="1366" height="608" alt="Login" src="https://github.com/user-attachments/assets/f16734d9-d507-4127-9132-d1dc092e3c0e" />

## Admin Product Management

## Order Management
---

# 👨‍💻 Developer

**Roumya Ranjan Biswal**

Java Backend Developer | Spring Boot Developer | Microservices Enthusiast

LinkedIn: https://www.linkedin.com/in/roumyaranjan/

GitHub:
https://github.com/roumya-ranjan

---

## ⭐ If you found this project interesting, please give it a Star.
