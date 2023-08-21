using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EquineCastration.Migrations
{
    public partial class AddLocationPropertyToCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LocationOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationOther",
                table: "Cases");
        }
    }
}
