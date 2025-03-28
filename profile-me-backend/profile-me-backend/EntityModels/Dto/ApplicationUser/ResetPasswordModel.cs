namespace profile_me_backend.EntityModels.Dto.ApplicationUser
{
  public class ResetPasswordModel : BaseApplicationUserModel
  {
    public string Token { get; set; } = string.Empty;
    public string NewPassword { get; set; }= string.Empty;
  }
}
