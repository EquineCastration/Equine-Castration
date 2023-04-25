using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EquineCastration.Migrations
{
    public partial class AddCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HorseName = table.Column<string>(type: "text", nullable: false),
                    ClientSurname = table.Column<string>(type: "text", nullable: false),
                    DateOfCastration = table.Column<DateOnly>(type: "date", nullable: false),
                    IsLessThanTwo = table.Column<bool>(type: "boolean", nullable: false),
                    AgeAboveTwo = table.Column<int>(type: "integer", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    Breed = table.Column<string>(type: "text", nullable: false),
                    Technique = table.Column<string>(type: "text", nullable: false),
                    TechniqueOther = table.Column<string>(type: "text", nullable: false),
                    LocationTesticleLeft = table.Column<string>(type: "text", nullable: false),
                    LocationTesticleRight = table.Column<string>(type: "text", nullable: false),
                    LigatureUsed = table.Column<string>(type: "text", nullable: false),
                    SkinClosure = table.Column<string>(type: "text", nullable: false),
                    SkinClosureOther = table.Column<string>(type: "text", nullable: false),
                    Restraint = table.Column<string>(type: "text", nullable: false),
                    RestraintStanding = table.Column<string>(type: "text", nullable: false),
                    Environment = table.Column<string>(type: "text", nullable: false),
                    EnvironmentOther = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    PatientCleanliness = table.Column<string>(type: "text", nullable: false),
                    PatientCleanlinessOther = table.Column<string>(type: "text", nullable: false),
                    EnvironmentCleanliness = table.Column<string>(type: "text", nullable: false),
                    EnvironmentCleanlinessOther = table.Column<string>(type: "text", nullable: false),
                    PatienceCompliance = table.Column<string>(type: "text", nullable: false),
                    PatienceComplianceOther = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cases");
        }
    }
}
