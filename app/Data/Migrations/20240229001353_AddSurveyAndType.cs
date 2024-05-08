using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EquineCastration.Migrations
{
    /// <inheritdoc />
    public partial class AddSurveyAndType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Horses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Breed",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BreedOther",
                table: "Horses",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DateOfCastration",
                table: "Horses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<bool>(
                name: "IsClinicallyHealthy",
                table: "Horses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "IsClinicallyHealthyNo",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsOnMedication",
                table: "Horses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "IsOnMedicationYes",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocationTesticleLeft",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocationTesticleRight",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnershipLength",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Horses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SurveyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Surveys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SurveyTypeId = table.Column<int>(type: "integer", nullable: false),
                    CaseId = table.Column<int>(type: "integer", nullable: false),
                    SurveyCompletion = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    HasReturnedToNormalBehaviour = table.Column<bool>(type: "boolean", nullable: true),
                    IsStiffOrLame = table.Column<string>(type: "text", nullable: true),
                    HasSwellingAtSurgicalSite = table.Column<string>(type: "text", nullable: true),
                    HasSwellingAtSurgicalSiteOther = table.Column<string>(type: "text", nullable: true),
                    PictogramPainScore = table.Column<int>(type: "integer", nullable: true),
                    HasWoundDischarge = table.Column<string>(type: "text", nullable: true),
                    HasWoundDischargeOther = table.Column<string>(type: "text", nullable: true),
                    IsProtrudingFromSurgicalSite = table.Column<bool>(type: "boolean", nullable: true),
                    HasSurgicalSiteHealed = table.Column<string>(type: "text", nullable: true),
                    HasSurgicalSiteHealedOther = table.Column<string>(type: "text", nullable: true),
                    FirstTwoWeeksComplications = table.Column<string>(type: "text", nullable: true),
                    FirstTwoWeeksComplicationsYesOther = table.Column<string>(type: "text", nullable: true),
                    HasReturnedToNormalSelf = table.Column<bool>(type: "boolean", nullable: true),
                    AfterTwoWeeksComplications = table.Column<string>(type: "text", nullable: true),
                    AfterTwoWeeksComplicationsYesOther = table.Column<string>(type: "text", nullable: true),
                    HasSwellingPresentAtSurgicalSite = table.Column<bool>(type: "boolean", nullable: true),
                    HasAnyDischarge = table.Column<bool>(type: "boolean", nullable: true),
                    RequiredVetOrComplications = table.Column<string>(type: "text", nullable: false),
                    FurtherInformation = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Surveys_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Surveys_SurveyTypes_SurveyTypeId",
                        column: x => x.SurveyTypeId,
                        principalTable: "SurveyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_CaseId",
                table: "Surveys",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_SurveyTypeId",
                table: "Surveys",
                column: "SurveyTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Surveys");

            migrationBuilder.DropTable(
                name: "SurveyTypes");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "Breed",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "BreedOther",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "DateOfCastration",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "IsClinicallyHealthy",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "IsClinicallyHealthyNo",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "IsOnMedication",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "IsOnMedicationYes",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "LocationTesticleLeft",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "LocationTesticleRight",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "OwnershipLength",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Horses");
        }
    }
}
