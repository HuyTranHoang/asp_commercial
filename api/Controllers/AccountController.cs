using System.Security.Claims;
using api.DTOs;
using api.Entities.Identity;
using api.Exceptions;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public class AccountController : BaseApiController
{
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized(new ErrorResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized(new ErrorResponse(401));

        return new UserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user),
            DisplayName = user.DisplayName
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            ModelState.AddModelError("email", "Email taken");
            return ValidationProblem();
        }

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(new ErrorResponse(400));

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            Email = user.Email
        };
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        var user = await _userManager.FindByEmailAsync(email);

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            Email = user.Email
        };
    }
}
