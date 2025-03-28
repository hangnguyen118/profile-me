using profile_me_backend.Data.Repository.IRepository;
using profile_me_backend.EntityModels;

namespace profile_me_backend.Data.Repository
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ApplicationDbContext _db;
    public IBaseRepository<ApplicationUser> ApplicationUser { get; private set; }
    public UnitOfWork(ApplicationDbContext db)
    {
      _db = db;
      ApplicationUser = new BaseRepository<ApplicationUser>(_db);
    }
    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken= new CancellationToken())
    {
      return await _db.SaveChangesAsync(cancellationToken) > 0;
    }
  }
}
