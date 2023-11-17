using api.DTOs;
using api.Entities;
using api.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        var products = await _unitOfWork.ProductRepository.Get(null, includeProperties: "ProductType,ProductBrand");

        var productsDto = _mapper.Map<IEnumerable<ProductDto>>(products);
        return Ok(productsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _unitOfWork.ProductRepository.GetById(id);
        if (product == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        var productDto = _mapper.Map<ProductDto>(product);
        return Ok(productDto);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _unitOfWork.ProductRepository.Create(product);

        if (await _unitOfWork.SaveAll())
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);

        return BadRequest("Failed to create product");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
    {
        var existingProduct = await _unitOfWork.ProductRepository.GetById(id);
        if (existingProduct == null) return NotFound($"Product with id {id} not found");

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.ProductBrandId = product.ProductBrandId;
        existingProduct.ProductTypeId = product.ProductTypeId;

        _unitOfWork.ProductRepository.Update(existingProduct);

        if (await _unitOfWork.SaveAll()) return Ok(existingProduct);

        return BadRequest("Failed to update product");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var existingProduct = await _unitOfWork.ProductRepository.GetById(id);
        if (existingProduct == null)
        {
            return NotFound($"Product with id {id} not found");
        }

        _unitOfWork.ProductRepository.Delete(existingProduct);

        if (await _unitOfWork.SaveAll()) return Ok("Product deleted");

        return BadRequest("Failed to delete product");
    }

}