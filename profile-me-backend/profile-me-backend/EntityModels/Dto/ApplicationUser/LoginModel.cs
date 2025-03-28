namespace profile_me_backend.EntityModels.Dto.ApplicationUser
{
  public class LoginModel : BaseApplicationUserModel
  {
    public string Password { get; set; } = string.Empty;
  }
}
