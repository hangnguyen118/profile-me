namespace profile_me_backend.EntityModels.Dto.ApplicationUser
{
  public class RegisterModel : BaseApplicationUserModel
  {
    public string FullName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
  }
}
