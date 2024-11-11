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

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        [HttpGet("role/{username}")]
        public async Task<ActionResult<int>> GetUserRole(string username)
        {
            var roleId = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => u.Role) // Assuming `RoleId` is the integer field you want to return
                .FirstOrDefaultAsync();
            return Ok(roleId);
        }
    }
}
