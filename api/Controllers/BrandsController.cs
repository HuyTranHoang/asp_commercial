using api.Entities;
using api.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class BrandsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    public BrandsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductBrand>>> GetBrands()
    {
        var brands = await _unitOfWork.ProductBrandRepository.GetAllAsync();
        return Ok(brands);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductBrand>> GetBrand(int id)
    {
        var brand = await _unitOfWork.ProductBrandRepository.GetByIdAsync(id);
        if (brand == null) return NotFound($"Brand with id {id} not found");

        return Ok(brand);
    }

    [HttpPost]
    public async Task<ActionResult<ProductBrand>> CreateBrand(ProductBrand brand)
    {
        _unitOfWork.ProductBrandRepository.Create(brand);

        if (await _unitOfWork.SaveAll())
            return CreatedAtAction(nameof(GetBrand), new { id = brand.Id }, brand);

        return BadRequest("Failed to create brand");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductBrand>> UpdateBrand(int id, ProductBrand brand)
    {
        var existingBrand = await _unitOfWork.ProductBrandRepository.GetByIdAsync(id);
        if (existingBrand == null) return NotFound($"Brand with id {id} not found");

        existingBrand.Name = brand.Name;

        _unitOfWork.ProductBrandRepository.Update(existingBrand);

        if (await _unitOfWork.SaveAll()) return Ok(existingBrand);

        return BadRequest("Failed to update brand");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteBrand(int id)
    {
        var existingBrand = await _unitOfWork.ProductBrandRepository.GetByIdAsync(id);
        if (existingBrand == null) return NotFound($"Brand with id {id} not found");

        _unitOfWork.ProductBrandRepository.Delete(existingBrand);

        if (await _unitOfWork.SaveAll()) return Ok();

        return BadRequest("Failed to delete brand");
    }
}
