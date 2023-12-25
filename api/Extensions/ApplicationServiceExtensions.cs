using api.Data;
using api.Exceptions;
using api.Repository;
using api.Repository.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace api.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            var connectionString = config.GetConnectionString("LaptopConnection");
            options.UseSqlServer(connectionString);
        });

        services.AddSingleton<IConnectionMultiplexer>(_ =>
        {
            var redisUrl = ConfigurationOptions.Parse(config.GetConnectionString("RedisConnection"),
                true);
            return ConnectionMultiplexer.Connect(redisUrl);
        });

        services.AddCors();

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IBasketRepository, BasketRepository>();
        services.AddScoped<ITokenService, TokenService>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        services.AddCors();

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var errors = context.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage);

                var errorResponse = new ValidateInputError(400, errors);

                return new BadRequestObjectResult(errorResponse);
            };
        });

        return services;
    }
}