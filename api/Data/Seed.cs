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

        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }

    public static async Task SeedTypes(ApplicationDbContext context)
    {
        if (await context.ProductTypes.AnyAsync()) return;

        var typeData = await File.ReadAllTextAsync("Data/SeedData/ProductTypeSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var types = JsonSerializer.Deserialize<List<ProductType>>(typeData, options);

        context.ProductTypes.AddRange(types);

        await context.SaveChangesAsync();
    }

    public static async Task SeedBrands(ApplicationDbContext context)
    {
        if (await context.ProductBrands.AnyAsync()) return;

        var brandData = await File.ReadAllTextAsync("Data/SeedData/ProductBrandSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData, options);

        context.ProductBrands.AddRange(brands);

        await context.SaveChangesAsync();
    }
}