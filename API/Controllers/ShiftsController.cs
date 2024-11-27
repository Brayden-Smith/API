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

        [HttpGet("user/{username}")]
        public async Task<IEnumerable<Shift>> GetUserShifts(string username)
        {
            return await _context.Shifts
                .Where(shift => shift.Username == username)
                .ToListAsync();
        }

        [HttpGet("null-username")]
        public async Task<IEnumerable<Shift>> GetShiftsWithNullUsername()
        {
            return await _context.Shifts
                .Where(shift => shift.Username == null)
                .ToListAsync();
        }
        
        private async Task<bool> CheckUserShiftConflict(int shiftId, string username, DateTime shiftDate)
        {
            var existingShift = await _context.Shifts
                .Where(s => s.Username == username && s.DateTime.Date == shiftDate.Date && s.Id != shiftId)
                .FirstOrDefaultAsync();

            return existingShift != null;
        }
        
        private async Task<bool> CheckUserRoleConflict(string username, string shiftRole)
        {
            var userRoles = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => u.Roles)
                .FirstOrDefaultAsync();

            if (userRoles == null)
            {
                return false;
            }

            return userRoles.Contains(shiftRole);
        }

        [HttpPut("{id}/{username}")]
        public async Task<IActionResult> UpdateShiftUsername(int id, string? username)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            if (username != null)
            {
                if (await CheckUserShiftConflict(id, username, shift.DateTime))
                {
                    return BadRequest("User already has a shift on the same day.");
                }

                if (!await CheckUserRoleConflict(username, shift.Role))
                {
                    return BadRequest("User does not have the required role for this shift.");
                }
            }

            shift.Username = username;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpPost]
        public async Task<ActionResult<Shift>> AddShift([FromBody] Shift newShift)
        {
            if (newShift.Username != null)
            {
                if (await CheckUserShiftConflict(newShift.Id, newShift.Username, newShift.DateTime))
                {
                    return BadRequest("User already has a shift on the same day.");
                }

                if (!await CheckUserRoleConflict(newShift.Username, newShift.Role))
                {
                    return BadRequest("User does not have the required role for this shift.");
                }
            }

            newShift.Id = 0;

            _context.Shifts.Add(newShift);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShifts), new { id = newShift.Id }, newShift);
        }
        
        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateShift(int id, [FromBody] Shift updatedShift)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            if (updatedShift.Username != null)
            {
                if (await CheckUserShiftConflict(id, updatedShift.Username, updatedShift.DateTime))
                {
                    return BadRequest("User already has a shift on the same day.");
                }

                if (!await CheckUserRoleConflict(updatedShift.Username, updatedShift.Role))
                {
                    return BadRequest("User does not have the required role for this shift.");
                }
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

        [HttpGet("{id}/usernames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUsernamesInShift(int id)
        {
            var shift = await _context.Shifts
                .Where(s => s.Id == id)
                .Select(s => s.Username)
                .ToListAsync();

            if (!shift.Any())
            {
                return NotFound();
            }

            return Ok(shift);
        }
    }
}
