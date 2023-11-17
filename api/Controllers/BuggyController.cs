using api.Exceptions;
using api.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class BuggyController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public BuggyController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // 404 page not found


    // 401 unauthorized


    // 400 bad request
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest(new ErrorResponse(400));
    }

    // 400 validation error -- input string in the id field
    [HttpGet("bad-request/{id}")]
    public IActionResult GetValidationError(int id)
    {
        return Ok();
    }

    // 500 server error
    [HttpGet("server-error")]
    public async Task<IActionResult> GetServerError()
    {
        var thing = await _unitOfWork.ProductRepository.GetById(9999);
        var thingToReturn = thing.ToString();
        return Ok();
    }
}