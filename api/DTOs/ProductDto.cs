using Microsoft.EntityFrameworkCore;

namespace api.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductTypeName { get; set; }
    public string ProductBrandName { get; set; }
}
