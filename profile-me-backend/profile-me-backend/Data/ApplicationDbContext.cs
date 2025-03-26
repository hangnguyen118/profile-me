using Microsoft.EntityFrameworkCore;
using profile_me_backend.EntityModels;

namespace profile_me_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
}
