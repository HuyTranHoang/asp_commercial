using api.Entities;
using api.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IProductRepository _productRepository;


    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<ActionResult<Product>> GetProducts()
    {
        var products = await _productRepository.GetProducts();
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _productRepository.GetProductById(id);
        if (product == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _productRepository.CreateProduct(product);

        if (await _productRepository.SaveAll())
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);

        return BadRequest("Failed to create product");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
    {
        var existingProduct = await _productRepository.GetProductById(id);
        if (existingProduct == null) return NotFound($"Product with id {id} not found");

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.ProductBrandId = product.ProductBrandId;
        existingProduct.ProductTypeId = product.ProductTypeId;

        _productRepository.UpdateProduct(existingProduct);

        if (await _productRepository.SaveAll()) return Ok(existingProduct);

        return BadRequest("Failed to update product");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var existingProduct = await _productRepository.GetProductById(id);
        if (existingProduct == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        _productRepository.DeleteProduct(existingProduct);

        if (await _productRepository.SaveAll()) return Ok("Product deleted");

        return BadRequest("Failed to delete product");
    }

}