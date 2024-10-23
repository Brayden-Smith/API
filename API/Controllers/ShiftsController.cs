using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schedule.Database;
using Schedule.Database.Entities;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShiftsController : ControllerBase
    {
        private readonly ILogger<ShiftsController> _logger;
        private readonly ApplicationDbContext _context;

        public ShiftsController(ILogger<ShiftsController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Shift>> GetShifts()
        {
            return await _context.Shifts.ToListAsync();
        }
    }
}
