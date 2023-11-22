using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationBuilderExtensions
{
    public static async void MigrateAndSeedDatabase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<ApplicationDbContext>();
            await context.Database.MigrateAsync();
            await Seed.SeedTypes(context);
            await Seed.SeedBrands(context);
            await Seed.SeedProducts(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }
    }
}
