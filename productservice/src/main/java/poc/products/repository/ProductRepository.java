package poc.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poc.products.model.Products;

public interface ProductRepository extends JpaRepository<Products,Integer> {
}
