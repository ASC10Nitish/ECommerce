package poc.products.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import poc.products.ProductsApplication;
import poc.products.model.Products;
import poc.products.service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Products> getAllProducts()
    {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Optional<Products> getProductById(@PathVariable int productId)
    {
        return productService.getProductById(productId);
    }

    @PostMapping
    public Products createProducts(@Valid @RequestBody Products product)
    {
        return productService.createProduct(product);
    }

    @PutMapping("/{productId}")
    public Products updateProduct(@Valid @PathVariable int productId,@RequestBody Products updatedProduct)
    {
        return productService.updateProduct(productId,updatedProduct);
    }

    @DeleteMapping("/{productId}")
    public void deleteProductById(@PathVariable int productId)
    {
        productService.deleteProductById(productId);
    }



}
