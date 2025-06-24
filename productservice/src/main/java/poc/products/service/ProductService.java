package poc.products.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import poc.products.model.Products;
import poc.products.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {


    @Autowired
    private ProductRepository productRepo;

    public List<Products> getAllProducts()
    {
        return productRepo.findAll();
    }

    public Optional<Products> getProductById(int productId)
    {
        return productRepo.findById(productId);
    }

    public Products createProduct(Products product)
    {
        return productRepo.save(product);
    }

    public Products updateProduct(int productId,Products updatedProduct)
    {
        Optional<Products> existingProduct = productRepo.findById(productId);

        if (existingProduct.isPresent()) {
            Products product= existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setCategory(updatedProduct.getCategory());
            product.setPrice(updatedProduct.getPrice());
            return productRepo.save(product);
        } else {
            throw new RuntimeException("User not found with ID: " + productId);
        }
    }

    public void deleteProductById(int productId)
    {
        productRepo.deleteById(productId);
    }

}
