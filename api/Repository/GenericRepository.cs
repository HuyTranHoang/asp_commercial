using System.Linq.Expressions;
using api.Data;
using api.Helpers;
using api.Helpers.RequestQuery;
using api.Repository.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet = null;
    private readonly IMapper _mapper;

    public GenericRepository(ApplicationDbContext context)
    {
        _mapper = null;
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public GenericRepository(ApplicationDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }


    private IQueryable<T> PrepareQuery(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "")
    {
        IQueryable<T> query = _dbSet;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (!string.IsNullOrEmpty(includeProperties))
        {
            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        return query;
    }

    public async Task<PagedList<T>> GetAsync(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "",
        PaginationParams pagingParams = null)
    {
        var query = PrepareQuery(filter, orderBy, includeProperties);
        return await PagedList<T>.CreateAsync(query, pagingParams.PageNumber, pagingParams.PageSize);
    }

    public async Task<PagedList<TDto>> GetDtoAsync<TDto>(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "",
        PaginationParams pagingParams = null)
    {
        var query = PrepareQuery(filter, orderBy, includeProperties);
        var projectedQuery = query.ProjectTo<TDto>(_mapper.ConfigurationProvider);
        return await PagedList<TDto>.CreateAsync(projectedQuery, pagingParams.PageNumber, pagingParams.PageSize);
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public void Create(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Update(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }
}
