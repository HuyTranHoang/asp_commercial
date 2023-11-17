using api.Data;
using api.Entities;
using api.Repository.Interfaces;

namespace api.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IGenericRepository<Product> _productRepository;
        private IGenericRepository<ProductBrand> _productBrandRepository;
        private IGenericRepository<ProductType> _productTypeRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<Product> ProductRepository
        {
            get
            {
                if (_productRepository == null)
                    _productRepository = new GenericRepository<Product>(_context);

                return _productRepository;
            }
        }

        public IGenericRepository<ProductBrand> ProductBrandRepository
        {
            get
            {
                if (_productBrandRepository == null)
                    _productBrandRepository = new GenericRepository<ProductBrand>(_context);

                return _productBrandRepository;
            }
        }

        public IGenericRepository<ProductType> ProductTypeRepository
        {
            get
            {
                if (_productTypeRepository == null)
                    _productTypeRepository = new GenericRepository<ProductType>(_context);

                return _productTypeRepository;
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
