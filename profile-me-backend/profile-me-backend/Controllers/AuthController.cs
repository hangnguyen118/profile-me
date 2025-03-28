using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using profile_me_backend.EntityModels;
using profile_me_backend.EntityModels.Dto.ApplicationUser;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace profile_me_backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _config;
    private readonly SignInManager<ApplicationUser> _signInManager;
    //private readonly IEmailSender _emailSender;
    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, SignInManager<ApplicationUser> signInManager)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      //_emailSender = emailSender;
      _config = config;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
      var user = new ApplicationUser { FullName = model.FullName, Email = model.Email, UserName = model.Email };
      var result = await _userManager.CreateAsync(user, model.Password);
      if (result.Succeeded)
      {
        return Ok(new { message = "User created successfully!" });
      }
      return BadRequest(result.Errors);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
      var user = await _userManager.FindByEmailAsync(model.Email);
      if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
      {
        return Unauthorized();
      }
      var authClaims = new List<Claim>
        {
          new (ClaimTypes.NameIdentifier, user.Id),
          new (ClaimTypes.Name, user.UserName ?? "Unknown"),
          new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
      var token = GenerateToken(authClaims);
      return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
    private JwtSecurityToken GenerateToken(List<Claim> authClaims)
    {
      var secret = _config["JWT:Secret"] ?? "Default";
      SymmetricSecurityKey authSigningKey = new(Encoding.UTF8.GetBytes(secret));
      return new JwtSecurityToken(
          expires: DateTime.UtcNow.AddHours(3),
          claims: authClaims,
          signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
      );
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
      await _signInManager.SignOutAsync();
      return Ok(new { message = "Logged out successfully" });
    }
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
      var user = await _userManager.FindByEmailAsync(model.Email);
      if (user == null)
      {
        return BadRequest(new { message = "User not found" });
      }
      var token = await _userManager.GeneratePasswordResetTokenAsync(user);
      var resetLink = Url.Action("ResetPassword", "Auth", new { token, model.Email }, Request.Scheme);
      //await _emailSender.SendEmailAsync(email, "Reset Password", $"Use this link to reset your password: {resetLink}");
      return Ok(new { message = $"Password reset link sent to email \n ", changePasswordtoken = token });
    }
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
    {
      var user = await _userManager.GetUserAsync(User);
      var userName = User.Identity?.Name;

      if (user == null)
      {
        return Unauthorized();
      }

      var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      return Ok(new { message = "Password changed successfully" });
    }
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
      var user = await _userManager.FindByEmailAsync(model.Email);
      if (user == null)
      {
        return BadRequest(new { message = "Invalid email or token" });
      }

      var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      return Ok(new { message = "Password reset successfully" });
    }
  }
}
