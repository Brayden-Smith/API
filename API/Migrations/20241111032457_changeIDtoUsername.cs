using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Schedule.Migrations
{
    /// <inheritdoc />
    public partial class changeIDtoUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Shifts");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Shifts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Shifts");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Shifts",
                type: "int",
                nullable: true);
        }
    }
}
