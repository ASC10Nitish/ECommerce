package poc.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poc.cart.model.CartItem;
import poc.cart.model.Products;
import poc.cart.service.CartService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ Get only products added to the cart
    @GetMapping
    public ResponseEntity<List<Products>> getCartProducts() {
        List<Products> cartProducts = cartService.getCartProducts();
        return ResponseEntity.ok(cartProducts);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addProductToCart(@RequestBody Products product) {
        try {
            CartItem savedItem = cartService.addProductToCart(product);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to add product to cart");
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeProductFromCart(@PathVariable int productId) {
        boolean removed = cartService.removeProductFromCart(productId);

        if (removed) {
            return ResponseEntity.ok().body("{\"message\": \"Product removed successfully\"}");
        } else {
            return ResponseEntity.badRequest().body("{\"error\": \"Failed to remove product\"}");
        }
    }


}















