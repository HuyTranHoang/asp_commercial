using api.Data;
using api.Entities.Identity;
using Microsoft.AspNetCore.Identity;

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

        return services;
    }
}