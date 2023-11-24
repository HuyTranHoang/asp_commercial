using System.Linq.Expressions;
using api.Helpers;
using api.Helpers.RequestQuery;

namespace api.Repository.Interfaces;

public interface IGenericRepository<T> where T : class
{
    public Task<IEnumerable<T>> GetAll();
    public Task<PagedList<T>> Get(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, // q => q.OrderBy(s => s.lastName)
        string includeProperties = "",
        PaginationParams pagingParams = null);
    public Task<T> GetById(int id);
    public void Create(T entity);
    public void Update(T entity);
    public void Delete(T entity);
}
