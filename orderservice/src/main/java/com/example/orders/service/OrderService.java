//package com.example.orders.service;
//
//
//import com.example.orders.entity.Orders;
//import com.example.orders.entity.Products;
//import com.example.orders.repository.OrdersRepository;
//import jakarta.persistence.criteria.Order;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//public class OrderService {
//
//    @Autowired
//    private OrdersRepository orderRepo;
//
//
//
//    public List<Orders> getAllOrders() {
//        return orderRepo.findAll();
//    }
//
//    public void cancelOrder(Integer orderId) {
//        Orders order = orderRepo.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Order not found"));
//        order.setCancelled(true);
//        orderRepo.save(order);
//    }
//}




package com.example.orders.service;

import com.example.orders.entity.Orders;
import com.example.orders.entity.Products;
import com.example.orders.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository orderRepo;

    @Autowired
    private RestTemplate restTemplate;


//    public Orders placeOrder(List<Products> products) {
//        Orders order = new Orders();
//        order.setProducts(products);
//        order.setOrderDate(LocalDateTime.now());
//
//        double totalPrice = products.stream().mapToInt(Products::getPrice).sum();
//        order.setTotalPrice(totalPrice);
//        System.out.println("Order Total: " + totalPrice);
//        System.out.println("Order Products Count: " + products.size());
//        return orderRepo.save(order);
//    }



    public Orders placeOrder(List<Products> products) {

        System.out.println("Incoming Products Payload:");
        for (Products p : products) {
            System.out.println("Product ID: " + p.getProductId());
        }

        Orders order = new Orders();
        List<Products> fullProducts = new ArrayList<>();
        double totalPrice = 0.0;

        for (Products p : products) {

            Products fullProduct = restTemplate.getForObject(
                    "http://localhost:8082/products/" + p.getProductId(), Products.class);

            if (fullProduct != null) {
                totalPrice += fullProduct.getPrice();
                fullProducts.add(fullProduct);
            } else {
                throw new RuntimeException("Product not found with ID: " + p.getProductId());
            }
        }

        order.setProducts(fullProducts);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(totalPrice);

        System.out.println("Order Total: " + totalPrice);
        System.out.println("Order Products Count: " + fullProducts.size());

        return orderRepo.save(order);
    }

    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Orders> getLatestOrder() {
        return orderRepo.findTopByOrderByOrderIdDesc();
    }



    public void cancelOrder(Integer orderId) {
        Orders order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setCancelled(true);
        orderRepo.deleteById(orderId);
    }
}
