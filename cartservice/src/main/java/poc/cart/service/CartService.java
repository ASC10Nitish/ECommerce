package poc.cart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import poc.cart.model.CartItem;
import poc.cart.model.Products;
import poc.cart.repository.CartRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CartRepository cartRepository;



    private final String productServiceUrl = "http://localhost:8082/products";
    private List<Products> cartItems = new ArrayList<>();


    public CartItem addProductToCart(Products product) {
        // Find if the product is already in the cart
        return cartRepository.findByProductId(product.getProductId())
                .map(existingItem -> {
                    // Update details if needed
                    existingItem.setPrice(product.getPrice());
                    existingItem.setDescription(product.getDescription());
                    return cartRepository.save(existingItem);
                })
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setName(product.getName());
                    newItem.setCategory(product.getCategory());
                    newItem.setDescription(product.getDescription());
                    newItem.setPrice(product.getPrice());
                    return cartRepository.save(newItem);
                });
    }


    public List<Products> getCartProducts() {
        List<CartItem> items = cartRepository.findAll();

        List<Products> products = new ArrayList<>();
        for (CartItem item : items) {
            Products p = new Products(
                    item.getProductId(),
                    item.getName(),
                    item.getDescription(),
                    item.getCategory(),
                    item.getPrice()
            );
            products.add(p);
        }

        return products;
    }


    public boolean removeProductFromCart(int productId) {
        if (cartRepository.existsById(productId)) {
            cartRepository.deleteById(productId);
            return true;
        }
        return false;
    }

}





















