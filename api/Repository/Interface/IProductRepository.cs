using api.Entities;

namespace api.Repository.Interface;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetProducts();
    Task<Product> GetProductById(int id);

}