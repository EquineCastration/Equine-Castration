using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EquineCastration.Migrations
{
    /// <inheritdoc />
    public partial class DataTypeDaysAfter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "DaysAfterCase",
                table: "SurveyTypes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysAfterCase",
                table: "SurveyTypes");

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
        }
    }
}
