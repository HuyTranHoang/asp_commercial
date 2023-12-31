using api.Entities;
using StackExchange.Redis;

namespace api.Repository.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<Product> ProductRepository { get; }
    IGenericRepository<ProductBrand> ProductBrandRepository { get; }
    IGenericRepository<ProductType> ProductTypeRepository { get; }
    Task<bool> SaveAll();
}
