using Microsoft.EntityFrameworkCore;
using Schedule.Database.Entities;

namespace Schedule.Database
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}