using profile_me_backend.EntityModels;

namespace profile_me_backend.Data.Repository.IRepository
{
  public interface IUnitOfWork
  {
    IBaseRepository<ApplicationUser> ApplicationUser { get; }
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
  }
}
