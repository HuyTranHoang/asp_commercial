using System.Text;
using api.Data;
using api.Entities.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<AppUser>(option =>
        {
            option.Password.RequireNonAlphanumeric = false;
            option.Password.RequireDigit = false;
            option.Password.RequireLowercase = false;
            option.Password.RequireUppercase = false;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddSignInManager<SignInManager<AppUser>>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                    ValidIssuer = config["Token:Issuer"],
                    ValidateIssuer = true,
                    ValidAudience = config["Token:Audience"]
                };
            });

        return services;
    }
}