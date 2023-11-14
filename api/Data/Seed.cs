using System.Text.Json;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Seed
{
    public static async Task SeedProducts(ApplicationDbContext context)
    {
        if (await context.Products.AnyAsync()) return;

        var productData = await File.ReadAllTextAsync("Data/SeedData/ProductSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var products = JsonSerializer.Deserialize<List<Product>>(productData, options);

        foreach (var product in products)
        {
            context.Products.Add(product);
        }
        await context.SaveChangesAsync();
    }

    public static async Task SeedTypes(ApplicationDbContext context)
    {
        if (await context.ProductTypes.AnyAsync()) return;

        var typeData = await File.ReadAllTextAsync("Data/SeedData/ProductTypeSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var types = JsonSerializer.Deserialize<List<ProductType>>(typeData, options);

        foreach (var type in types)
        {
            context.ProductTypes.Add(type);
        }
        await context.SaveChangesAsync();
    }

    public static async Task SeedBrands(ApplicationDbContext context)
    {
        if (await context.ProductBrands.AnyAsync()) return;

        var brandData = await File.ReadAllTextAsync("Data/SeedData/ProductBrandSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData, options);

        foreach (var brand in brands)
        {
            context.ProductBrands.Add(brand);
        }
        await context.SaveChangesAsync();
    }
}