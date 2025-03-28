using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using profile_me_backend.Data.Repository.IRepository;
using profile_me_backend.EntityModels;

namespace profile_me_backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class ApplicationUserController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;
    public ApplicationUserController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }
    [HttpGet]
    public async Task<IEnumerable<ApplicationUser>> GetApplicationUsers()
    {
      return await _unitOfWork.ApplicationUser.GetAllAsync();
    }

    [HttpGet("{id}", Name = nameof(GetApplicationUser))]
    [ProducesResponseType(200, Type = typeof(ApplicationUser))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetApplicationUser(string id)
    {
      ApplicationUser? user = await _unitOfWork.ApplicationUser.GetAsync(u => u.Id == id);
      if (user == null)
      {
        return NotFound();
      }
      return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(201, Type = typeof(ApplicationUser))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] ApplicationUser user)
    {
      if(user == null)
      {
        return BadRequest();
      }
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      ApplicationUser? addUser = await _unitOfWork.ApplicationUser.AddAsync(user);
      await _unitOfWork.SaveChangesAsync();
      if (addUser == null)
      {
        return BadRequest("Repository failed to create application user.");
      }
      else
      {
        return CreatedAtRoute(
          routeName: nameof(GetApplicationUser),
          routeValues: new
          {
            id = addUser.Id.ToLower()
          },
          value: addUser);
      }
    }
    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(string id, [FromBody] ApplicationUser user)
    {
      id = id.ToLower();
      user.Id = user.Id.ToLower();
      if (user == null || user.Id != id)
      {
        return BadRequest();
      }
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      ApplicationUser? existing = await _unitOfWork.ApplicationUser.GetAsync(u => u.Id == id);
      if (existing == null)
      {
        return NotFound();
      }
      existing.FullName = user.FullName;
      _unitOfWork.ApplicationUser.Update(existing);
      await _unitOfWork.SaveChangesAsync();
      return new NoContentResult();
    }
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(string id)
    {
      ApplicationUser? user = await _unitOfWork.ApplicationUser.GetAsync(u => u.Id == id);
      if (user == null)
      {
        return NotFound();
      }
      _unitOfWork.ApplicationUser.Remove(user);
      bool deleted = await _unitOfWork.SaveChangesAsync();
      if (deleted)
      {
        return new NoContentResult();
      }
      else
      {
        return BadRequest($"Application user {id} was found but failed to delete.");
      }
    }
  }
}
