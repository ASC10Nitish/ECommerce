package poc.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poc.cart.model.CartItem;

import java.util.List;
import java.util.Optional;


public interface CartRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByProductId(int productId);
}







