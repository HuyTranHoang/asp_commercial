namespace api.Helpers.RequestQuery;

public class ProductParams : PaginationParams
{
    public string Sort { get; set; }
    public int? BrandId { get; set; }
    public int? TypeId { get; set; }
    public string Search { get; set; }

}
