//package com.example.orders.entity;
//
//import jakarta.persistence.*;
//import jdk.jfr.DataAmount;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Data
//@Entity
//@Table(name="orders")
//public class Orders {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer orderId;
//
//    private Double totalPrice;
//
//    private LocalDateTime orderDate;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<Products> products;
//
//    @Transient
//    private boolean isCancelled;
//
//
//
//}






package com.example.orders.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @Column(name = "total_price")
    private Double totalPrice;

    private LocalDateTime orderDate;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Products> products;

    private boolean cancelled = false;
}
