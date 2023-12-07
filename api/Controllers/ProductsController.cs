using System.Linq.Expressions;
using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
using api.Helpers.RequestQuery;
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
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] ProductParams request)
    {
        var productDtos = await _unitOfWork.ProductRepository.GetDtoAsync<ProductDto>(
            BuildFilterExpression(request),
            BuildSortQuery(request),
            SD.ProductIncludeTypeAndBrand,
            request);

        Response.AddPaginationHeader(new PaginationHeader(
            request.PageNumber, request.PageSize, productDtos.TotalCount, productDtos.TotalPages));

        return Ok(productDtos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var query = await _unitOfWork.ProductRepository.GetAsync(
            filter: p => p.Id == id,
            includeProperties: SD.ProductIncludeTypeAndBrand);

        var product = query.FirstOrDefault();
        if (product == null) return NotFound($"Product with id {id} not found");

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
        var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(id);
        if (existingProduct == null) return NotFound($"Product with id {id} not found");

        _mapper.Map(product, existingProduct);

        _unitOfWork.ProductRepository.Update(existingProduct);

        if (await _unitOfWork.SaveAll()) return Ok(existingProduct);

        return BadRequest("Failed to update product");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(id);
        if (existingProduct == null) return NotFound($"Product with id {id} not found");

        _unitOfWork.ProductRepository.Delete(existingProduct);

        if (await _unitOfWork.SaveAll()) return Ok("Product deleted");

        return BadRequest("Failed to delete product");
    }

    #region helper methods

    private static Expression<Func<Product, bool>> BuildFilterExpression(ProductParams request)
    {

        int? brandId = request.BrandId;
        int? typeId = request.TypeId;
        string search = request.Search;

        return x => (string.IsNullOrEmpty(search) || x.Name.ToLower().Contains(search)) &&
            (!brandId.HasValue || x.ProductBrandId == brandId) &&
            (!typeId.HasValue || x.ProductTypeId == typeId);
    }

    private static Func<IQueryable<Product>, IOrderedQueryable<Product>> BuildSortQuery(ProductParams request)
    {
        string sort = request.Sort;
        return sort switch
        {
            "priceAsc" => p => p.OrderBy(i => i.Price),
            "priceDesc" => p => p.OrderByDescending(i => i.Price),
            _ => p => p.OrderBy(i => i.Name)
        };
    }

    #endregion

}