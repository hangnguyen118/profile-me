using System.Linq.Expressions;

namespace profile_me_backend.Data.Repository.IRepository
{
    public interface IBaseRepository<T>  where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, string? includeProperties = null, CancellationToken cancellationToken = new CancellationToken());
        Task<T?> GetAsync(Expression<Func<T, bool>>? filter, string? includeProperties = null, CancellationToken cancellationToken = new CancellationToken());
        Task<T?> AddAsync(T entity, CancellationToken cancellationToken = new CancellationToken());
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entity);
        void Update(T entity);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = new CancellationToken());
    }
}
