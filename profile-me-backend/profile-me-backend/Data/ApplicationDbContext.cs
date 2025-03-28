using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;
using profile_me_backend.EntityModels;

namespace profile_me_backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
  {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
}
