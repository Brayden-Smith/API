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

        //returns all shifts
        [HttpGet]
        public async Task<IEnumerable<Shift>> GetShifts()
        {
            return await _context.Shifts.ToListAsync();
        }
        
        //returns all shifts for a specific user
        [HttpGet("user/{username}")]
        public async Task<IEnumerable<Shift>> GetUserShifts(string username)
        {
            return await _context.Shifts
                .Where(shift => shift.Username == username)
                .ToListAsync();
        }
        
        
        //returns all shifts that are unassigned
        [HttpGet("null-username")]
        public async Task<IEnumerable<Shift>> GetShiftsWithNullUsername()
        {
            return await _context.Shifts
                .Where(shift => shift.Username == null)
                .ToListAsync();
        }
        
        
        //changes the ownership of a shift
        [HttpPut("{id}/{username}")]
        public async Task<IActionResult> UpdateShiftUsername(int id, string? username)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }
            shift.Username = username;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        //makes a new shift in database
        [HttpPost]
        public async Task<ActionResult<Shift>> AddShift([FromBody] Shift newShift)
        {
            newShift.Id = 0;
            
            _context.Shifts.Add(newShift);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShifts), new { id = newShift.Id }, newShift);
        }
        
        //normal update feature
        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateShift(int id, [FromBody] Shift updatedShift)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            shift.Name = updatedShift.Name;
            shift.DateTime = updatedShift.DateTime;
            shift.Role = updatedShift.Role;
            shift.Username = updatedShift.Username;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShift(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        //gets all the workers on a shifts day
        [HttpGet("{id}/usernames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUsernamesInShift(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            var shiftDate = shift.DateTime.Date;

            var usernames = await _context.Shifts
                .Where(s => s.DateTime.Date == shiftDate && s.Username != null)
                .Select(s => s.Username)
                .Distinct()
                .ToListAsync();

            if (usernames == null || !usernames.Any())
            {
                return NotFound();
            }

            return Ok(usernames);
        }
    }
}