//package com.example.orders.controller;
//
//import com.example.orders.entity.Orders;
//import com.example.orders.entity.Products;
//import com.example.orders.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/orders")
//@CrossOrigin("*")
//public class OrderController {
//
//    @Autowired
//    private OrderService orderService;
//
//
//    @GetMapping
//    public ResponseEntity<List<Orders>> getAllOrders() {
//        return ResponseEntity.ok(orderService.getAllOrders());
//    }
//
//    @PutMapping("/cancel/{orderId}")
//    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId) {
//        orderService.cancelOrder(orderId);
//        return ResponseEntity.ok("Order Cancelled Successfully");
//    }
//}
//




package com.example.orders.controller;

import com.example.orders.entity.Orders;
import com.example.orders.entity.Products;
import com.example.orders.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Orders> placeOrder(@RequestBody List<Products> products) {
        Orders order = orderService.placeOrder(products);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/latest")
    public ResponseEntity<Object> getLatestOrder() {
        return orderService.getLatestOrder()
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("No orders found"));
    }




    @DeleteMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order Cancelled Successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
