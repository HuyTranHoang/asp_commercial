namespace api.Entities;

public class ProductBrand
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Product> Products { get; set; }
}