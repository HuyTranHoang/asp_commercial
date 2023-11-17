using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.ProductBrandName,
                opt => opt.MapFrom(src => src.ProductBrand.Name))
            .ForMember(dest => dest.ProductTypeName,
                opt => opt.MapFrom(src => src.ProductType.Name))
            .ForMember(dest => dest.PictureUrl,
                opt => opt.MapFrom<ProductImageUrlResolver>());

        CreateMap<ProductDto, Product>();
    }
}
