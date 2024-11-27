using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schedule.Database;
using Schedule.Database.Entities;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<bool> CheckRoleExclusivities(string[] roles)
        {
            var roleEntities = await _context.Roles
                .Where(r => roles.Contains(r.Name))
                .ToListAsync();

            var exclusivities = new HashSet<string>();

            foreach (var role in roleEntities)
            {
                if (role.Exclusivities != null)
                {
                    foreach (var exclusiveRole in role.Exclusivities)
                    {
                        if (exclusivities.Contains(exclusiveRole))
                        {
                            return true; // Found two exclusive roles
                        }
                        exclusivities.Add(exclusiveRole);
                    }
                }
            }

            return false; // No exclusive roles found
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("roles/{username}")]
        public async Task<ActionResult<string[]>> GetUserRoles(string username)
        {
            var roles = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => u.Roles)
                .FirstOrDefaultAsync();
            if (roles == null)
            {
                return NotFound();
            }
            return Ok(roles);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User newUser)
        {
            if (await CheckRoleExclusivities(newUser.Roles))
            {
                return BadRequest("User roles contain exclusivities.");
            }

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = newUser.Id }, newUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            if (await CheckRoleExclusivities(updatedUser.Roles))
            {
                return BadRequest("User roles contain exclusivities.");
            }

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;
            user.Username = updatedUser.Username;
            user.Roles = updatedUser.Roles; // Updated to handle array of strings

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}