using api.Entities;
using api.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class TypesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    public TypesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductType>>> GetTypes()
    {
        var types = await _unitOfWork.ProductTypeRepository.GetAll();
        return Ok(types);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductType>> GetType(int id)
    {
        var type = await _unitOfWork.ProductTypeRepository.GetById(id);
        if (type == null)
        {
            return NotFound($"Type with id {id} not found");
        }

        return Ok(type);
    }

    [HttpPost]
    public async Task<ActionResult<ProductType>> CreateType(ProductType type)
    {
        _unitOfWork.ProductTypeRepository.Create(type);

        if (await _unitOfWork.SaveAll())
            return CreatedAtAction(nameof(GetType), new { id = type.Id }, type);

        return BadRequest("Failed to create type");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductType>> UpdateType(int id, ProductType type)
    {
        var existingType = await _unitOfWork.ProductTypeRepository.GetById(id);
        if (existingType == null) return NotFound($"Type with id {id} not found");

        existingType.Name = type.Name;

        _unitOfWork.ProductTypeRepository.Update(existingType);

        if (await _unitOfWork.SaveAll()) return Ok(existingType);

        return BadRequest("Failed to update type");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ProductType>> DeleteType(int id)
    {
        var existingType = await _unitOfWork.ProductTypeRepository.GetById(id);
        if (existingType == null) return NotFound($"Type with id {id} not found");

        _unitOfWork.ProductTypeRepository.Delete(existingType);

        if (await _unitOfWork.SaveAll()) return Ok(existingType);

        return BadRequest("Failed to delete type");
    }
}
