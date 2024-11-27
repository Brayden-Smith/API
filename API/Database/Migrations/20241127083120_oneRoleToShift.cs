using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Schedule.Database.Migrations
{
    /// <inheritdoc />
    public partial class oneRoleToShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Roles",
                table: "Shifts",
                newName: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Shifts",
                newName: "Roles");
        }
    }
}
