using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EquineCastration.Migrations
{
    /// <inheritdoc />
    public partial class AddDaysAfterToSurveyType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DaysAfterCase",
                table: "SurveyTypes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "OptOut",
                table: "Owners",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysAfterCase",
                table: "SurveyTypes");

            migrationBuilder.DropColumn(
                name: "OptOut",
                table: "Owners");
        }
    }
}
