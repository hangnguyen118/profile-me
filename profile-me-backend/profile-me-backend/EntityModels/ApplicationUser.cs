using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace profile_me_backend.EntityModels
{
  public class ApplicationUser : IdentityUser
  {
    [Required]
    [MinLength(3, ErrorMessage = "The FullName field must have at least 3 characters.")]
    public string FullName { get; set; } = string.Empty;
  }
}
