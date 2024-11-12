using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schedule.Database;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> QueryLogin(String username, String password)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == username && u.Password == password);
            //testing testing testing
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