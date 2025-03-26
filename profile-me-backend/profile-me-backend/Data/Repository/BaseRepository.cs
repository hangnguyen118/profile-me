using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;
using profile_me_backend.Data.Repository.IRepository;

namespace profile_me_backend.Data.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly ApplicationDbContext _db;
        protected readonly DbSet<T> _dbSet;
        private static readonly char[] separator = [','];

        public BaseRepository(ApplicationDbContext db)
        {
            _db = db;
            _dbSet = _db.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, string? includeProperties = null, CancellationToken cancellationToken = new CancellationToken())
        {
            IQueryable<T> query = _dbSet.AsNoTracking();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeProp in includeProperties
                    .Split(separator, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }
            return await query.ToListAsync(cancellationToken);
        }
        public async Task<T?> GetAsync(Expression<Func<T, bool>>? filter, string? includeProperties = null, CancellationToken cancellationToken = new CancellationToken())
        {
            IQueryable<T> query = _dbSet.AsNoTracking();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var property in includeProperties
                    .Split(separator, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(property.Trim());
                }
            }
            return await query.FirstOrDefaultAsync(cancellationToken);
        }
        public async Task AddAsync(T entity, CancellationToken cancellationToken = new CancellationToken())
        {
            await _dbSet.AddAsync(entity, cancellationToken);
        }
        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entity)
        {
            _dbSet.RemoveRange(entity);
        }
        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = new CancellationToken())
        {
            return await _dbSet.AnyAsync(filter, cancellationToken);
        }
    }
}
