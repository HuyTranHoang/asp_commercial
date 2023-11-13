using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Seed
{
    public static async Task SeedProducts(ApplicationDbContext context)
    {
        if (await context.Products.AnyAsync()) return;

        var productData = await File.ReadAllTextAsync("Data/ProductSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var products = JsonSerializer.Deserialize<List<Product>>(productData, options);

        foreach (var product in products)
        {
            context.Products.Add(product);
        }
        await context.SaveChangesAsync();
    }
}