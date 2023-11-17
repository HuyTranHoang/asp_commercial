using api.DTOs;
using api.Entities;
using AutoMapper;
namespace api.Helpers;

public class ProductImageUrlResolver : IValueResolver<Product, ProductDto, string> // input, output, type
{
    private readonly IConfiguration _config;

    public ProductImageUrlResolver(IConfiguration config)
    {
        _config = config;
    }

    public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
    {
        if (!string.IsNullOrEmpty(source.PictureUrl))
        {
            return _config["ApiUrl"] + source.PictureUrl;
        }

        return null;
    }
}