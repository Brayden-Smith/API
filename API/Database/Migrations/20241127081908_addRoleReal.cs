using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Schedule.Database.Migrations
{
    /// <inheritdoc />
    public partial class addRoleReal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Permissions = table.Column<string[]>(nullable: false),
                    Exclusivities = table.Column<string[]>(nullable: false),
                    ParentRoleId = table.Column<int>(nullable: true),
                    ChildRoleIds = table.Column<int[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}