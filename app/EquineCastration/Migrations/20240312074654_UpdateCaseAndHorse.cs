using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EquineCastration.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCaseAndHorse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnershipLength",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "AgeAboveTwo",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "Breed",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "DateOfCastration",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "Environment",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "EnvironmentOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigatureUsed",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LocationTesticleLeft",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LocationTesticleRight",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PatientCompliance",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PatientComplianceOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "RestraintStanding",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "SkinClosureOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "Technique",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "TechniqueOther",
                table: "Cases");

            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Cases",
                newName: "AantimicrobialAdminTiming");

            migrationBuilder.RenameColumn(
                name: "IsLessThanTwo",
                table: "Cases",
                newName: "PreoperativeAntimicrobialsGiven");

            migrationBuilder.RenameColumn(
                name: "Deceased",
                table: "Cases",
                newName: "PreoperativeAnalgesiaGiven");

            migrationBuilder.AlterColumn<string>(
                name: "IsOnMedicationYes",
                table: "Horses",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "IsClinicallyHealthyNo",
                table: "Horses",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "Deceased",
                table: "Horses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "PatientCleanlinessOther",
                table: "Cases",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LocationOther",
                table: "Cases",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "EnvironmentCleanlinessOther",
                table: "Cases",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "AnyIntraoperativeComplications",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "AnyIntraoperativeComplicationsYes",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AnyPostoperativeComplications",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<List<string>>(
                name: "AnyPostoperativeComplicationsYes",
                table: "Cases",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnyPostoperativeComplicationsYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmasculatorsHeldDurationMinutes",
                table: "Cases",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmasculatorsUsed",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LigaturesPlacedAroundVasculatureOnly",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LigaturesPlacedAroundVasculatureOnlyYes",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LigaturesPlacedAroundVasculatureOnlyYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LigaturesUsedToCloseParietalTunic",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LigaturesUsedToCloseParietalTunicYes",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LigaturesUsedToCloseParietalTunicYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LocalAnaestheticUsed",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ParietalTunicIncised",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PortionParietalTunicRemoved",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PostoperativeAnalgesiaGiven",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PostoperativeAnalgesiaGivenDays",
                table: "Cases",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PostoperativeAnalgesiaGivenYes",
                table: "Cases",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostoperativeAnalgesiaGivenYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PostoperativeAntimicrobialsGiven",
                table: "Cases",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PostoperativeAntimicrobialsGivenDays",
                table: "Cases",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PostoperativeAntimicrobialsGivenYes",
                table: "Cases",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostoperativeAntimicrobialsGivenYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PreoperativeAnalgesiaGivenYes",
                table: "Cases",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreoperativeAnalgesiaGivenYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "PreoperativeAntimicrobialsGivenYes",
                table: "Cases",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreoperativeAntimicrobialsGivenYesOther",
                table: "Cases",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SkinClosurePrimaryOrPartial",
                table: "Cases",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deceased",
                table: "Horses");

            migrationBuilder.DropColumn(
                name: "AnyIntraoperativeComplications",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "AnyIntraoperativeComplicationsYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "AnyPostoperativeComplications",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "AnyPostoperativeComplicationsYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "AnyPostoperativeComplicationsYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "EmasculatorsHeldDurationMinutes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "EmasculatorsUsed",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesPlacedAroundVasculatureOnly",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesPlacedAroundVasculatureOnlyYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesPlacedAroundVasculatureOnlyYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesUsedToCloseParietalTunic",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesUsedToCloseParietalTunicYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LigaturesUsedToCloseParietalTunicYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "LocalAnaestheticUsed",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "ParietalTunicIncised",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PortionParietalTunicRemoved",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAnalgesiaGiven",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAnalgesiaGivenDays",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAnalgesiaGivenYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAnalgesiaGivenYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAntimicrobialsGiven",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAntimicrobialsGivenDays",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAntimicrobialsGivenYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PostoperativeAntimicrobialsGivenYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PreoperativeAnalgesiaGivenYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PreoperativeAnalgesiaGivenYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PreoperativeAntimicrobialsGivenYes",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "PreoperativeAntimicrobialsGivenYesOther",
                table: "Cases");

            migrationBuilder.DropColumn(
                name: "SkinClosurePrimaryOrPartial",
                table: "Cases");

            migrationBuilder.RenameColumn(
                name: "PreoperativeAntimicrobialsGiven",
                table: "Cases",
                newName: "IsLessThanTwo");

            migrationBuilder.RenameColumn(
                name: "PreoperativeAnalgesiaGiven",
                table: "Cases",
                newName: "Deceased");

            migrationBuilder.RenameColumn(
                name: "AantimicrobialAdminTiming",
                table: "Cases",
                newName: "Weight");

            migrationBuilder.AlterColumn<string>(
                name: "IsOnMedicationYes",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IsClinicallyHealthyNo",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnershipLength",
                table: "Horses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "PatientCleanlinessOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LocationOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EnvironmentCleanlinessOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AgeAboveTwo",
                table: "Cases",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Breed",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DateOfCastration",
                table: "Cases",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<List<string>>(
                name: "Environment",
                table: "Cases",
                type: "text[]",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "EnvironmentOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LigatureUsed",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocationTesticleLeft",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocationTesticleRight",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatientCompliance",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatientComplianceOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RestraintStanding",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SkinClosureOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Technique",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TechniqueOther",
                table: "Cases",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
