using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schedule.Database;
using Schedule.Database.Entities;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<ShiftsController> _logger;
        private readonly ApplicationDbContext _context;

        public LoginController(ILogger<ShiftsController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> QueryLogin(String username, String password)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == username && u.Password == password);

            if (userExists)
            {
                return Ok("Login successful");
            }
            else
            {
                return Unauthorized("Invalid username or password");
            }
        }
    }
}