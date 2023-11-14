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
        return await _productRepository.GetProductById(id);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
    {
        var existingProduct = await _productRepository.GetProductById(id);
        if (existingProduct == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        return await _productRepository.UpdateProduct(product);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var existingProduct = await _productRepository.GetProductById(id);
        if (existingProduct == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        await _productRepository.DeleteProduct(id);
        return Ok();
    }

}