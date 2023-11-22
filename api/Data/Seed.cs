using System.Text.Json;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public static class Seed
{
    private static JsonSerializerOptions Options { get; set; } = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    private const string ProductSeedData = "Data/SeedData/ProductSeedData.json";
    private const string ProductTypeSeedData = "Data/SeedData/ProductTypeSeedData.json";
    private const string ProductBrandSeedData = "Data/SeedData/ProductBrandSeedData.json";

    public static async Task SeedProducts(ApplicationDbContext context)
    {
        if (await context.Products.AnyAsync()) return;

        var productData = await File.ReadAllTextAsync(ProductSeedData);

        var products = JsonSerializer.Deserialize<List<Product>>(productData, Options);

        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }

    public static async Task SeedTypes(ApplicationDbContext context)
    {
        if (await context.ProductTypes.AnyAsync()) return;

        var typeData = await File.ReadAllTextAsync(ProductTypeSeedData);

        var types = JsonSerializer.Deserialize<List<ProductType>>(typeData, Options);

        context.ProductTypes.AddRange(types);

        await context.SaveChangesAsync();
    }

    public static async Task SeedBrands(ApplicationDbContext context)
    {
        if (await context.ProductBrands.AnyAsync()) return;

        var brandData = await File.ReadAllTextAsync(ProductBrandSeedData);

        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData, Options);

        context.ProductBrands.AddRange(brands);

        await context.SaveChangesAsync();
    }
}