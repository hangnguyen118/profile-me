namespace profile_me_backend.EntityModels.Dto.ApplicationUser
{
  public class ChangePasswordModel : BaseApplicationUserModel
  {
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
  }
}
