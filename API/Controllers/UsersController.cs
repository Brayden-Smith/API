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
        private readonly ILogger<ShiftsController> _logger;
        private readonly ApplicationDbContext _context;

        public UsersController(ILogger<ShiftsController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetShifts()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
