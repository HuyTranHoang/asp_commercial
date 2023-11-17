using System.Linq.Expressions;

namespace api.Repository.Interfaces;

public interface IGenericRepository<T> where T : class
{
    public Task<IEnumerable<T>> GetAll();
    public Task<IEnumerable<T>> Get(
        Expression<Func<T, bool>> expression,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, // q => q.OrderBy(s => s.lastName)
        string includeProperties = "");
    public Task<T> GetById(int id);
    public void Create(T entity);
    public void Update(T entity);
    public void Delete(T entity);
}
