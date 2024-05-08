﻿// <auto-generated />
using System;
using System.Collections.Generic;
using EquineCastration.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EquineCastration.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("EquineCastration.Data.Entities.Case", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AntimicrobialAdminTiming")
                        .HasColumnType("integer");

                    b.Property<bool>("AnyIntraoperativeComplications")
                        .HasColumnType("boolean");

                    b.Property<string>("AnyIntraoperativeComplicationsYes")
                        .HasColumnType("text");

                    b.Property<bool>("AnyPostoperativeComplications")
                        .HasColumnType("boolean");

                    b.Property<List<string>>("AnyPostoperativeComplicationsYes")
                        .HasColumnType("text[]");

                    b.Property<string>("AnyPostoperativeComplicationsYesOther")
                        .HasColumnType("text");

                    b.Property<string>("AuthorId")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("DischargeDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DischargeNote")
                        .HasColumnType("text");

                    b.Property<int?>("EmasculatorsHeldDurationMinutes")
                        .HasColumnType("integer");

                    b.Property<bool>("EmasculatorsUsed")
                        .HasColumnType("boolean");

                    b.Property<string>("EnvironmentCleanliness")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("EnvironmentCleanlinessOther")
                        .HasColumnType("text");

                    b.Property<int>("HorseId")
                        .HasColumnType("integer");

                    b.Property<bool>("LigaturesPlacedAroundVasculatureOnly")
                        .HasColumnType("boolean");

                    b.Property<string>("LigaturesPlacedAroundVasculatureOnlyYes")
                        .HasColumnType("text");

                    b.Property<string>("LigaturesPlacedAroundVasculatureOnlyYesOther")
                        .HasColumnType("text");

                    b.Property<bool>("LigaturesUsedToCloseParietalTunic")
                        .HasColumnType("boolean");

                    b.Property<string>("LigaturesUsedToCloseParietalTunicYes")
                        .HasColumnType("text");

                    b.Property<string>("LigaturesUsedToCloseParietalTunicYesOther")
                        .HasColumnType("text");

                    b.Property<bool>("LocalAnaestheticUsed")
                        .HasColumnType("boolean");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LocationOther")
                        .HasColumnType("text");

                    b.Property<string>("OwnerId")
                        .HasColumnType("text");

                    b.Property<bool>("ParietalTunicIncised")
                        .HasColumnType("boolean");

                    b.Property<string>("PatientCleanliness")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PatientCleanlinessOther")
                        .HasColumnType("text");

                    b.Property<bool>("PortionParietalTunicRemoved")
                        .HasColumnType("boolean");

                    b.Property<bool>("PostoperativeAnalgesiaGiven")
                        .HasColumnType("boolean");

                    b.Property<int?>("PostoperativeAnalgesiaGivenDays")
                        .HasColumnType("integer");

                    b.Property<List<string>>("PostoperativeAnalgesiaGivenYes")
                        .HasColumnType("text[]");

                    b.Property<string>("PostoperativeAnalgesiaGivenYesOther")
                        .HasColumnType("text");

                    b.Property<bool>("PostoperativeAntimicrobialsGiven")
                        .HasColumnType("boolean");

                    b.Property<int?>("PostoperativeAntimicrobialsGivenDays")
                        .HasColumnType("integer");

                    b.Property<List<string>>("PostoperativeAntimicrobialsGivenYes")
                        .HasColumnType("text[]");

                    b.Property<string>("PostoperativeAntimicrobialsGivenYesOther")
                        .HasColumnType("text");

                    b.Property<bool>("PreoperativeAnalgesiaGiven")
                        .HasColumnType("boolean");

                    b.Property<List<string>>("PreoperativeAnalgesiaGivenYes")
                        .HasColumnType("text[]");

                    b.Property<string>("PreoperativeAnalgesiaGivenYesOther")
                        .HasColumnType("text");

                    b.Property<bool>("PreoperativeAntimicrobialsGiven")
                        .HasColumnType("boolean");

                    b.Property<List<string>>("PreoperativeAntimicrobialsGivenYes")
                        .HasColumnType("text[]");

                    b.Property<string>("PreoperativeAntimicrobialsGivenYesOther")
                        .HasColumnType("text");

                    b.Property<string>("Restraint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SkinClosure")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SkinClosurePrimaryOrPartial")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("HorseId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Cases");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.FeatureFlag", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("text");

                    b.Property<bool>("isActive")
                        .HasColumnType("boolean");

                    b.HasKey("Key");

                    b.ToTable("FeatureFlags");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Horse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<string>("Breed")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("BreedOther")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("DateOfCastration")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("Deceased")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsClinicallyHealthy")
                        .HasColumnType("boolean");

                    b.Property<string>("IsClinicallyHealthyNo")
                        .HasColumnType("text");

                    b.Property<bool>("IsOnMedication")
                        .HasColumnType("boolean");

                    b.Property<string>("IsOnMedicationYes")
                        .HasColumnType("text");

                    b.Property<string>("LocationTesticleLeft")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LocationTesticleRight")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OwnerId")
                        .HasColumnType("text");

                    b.Property<int>("Weight")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Horses");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UICulture")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.Owner", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId")
                        .IsUnique();

                    b.ToTable("Owners");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.Veterinarian", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("text");

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsAmbulatory")
                        .HasColumnType("boolean");

                    b.Property<int?>("YearsQualified")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId")
                        .IsUnique();

                    b.ToTable("Veterinarians");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.RegistrationRule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("RegistrationRules");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Survey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AfterTwoWeeksComplications")
                        .HasColumnType("text");

                    b.Property<string>("AfterTwoWeeksComplicationsYesOther")
                        .HasColumnType("text");

                    b.Property<int>("CaseId")
                        .HasColumnType("integer");

                    b.Property<string>("FirstTwoWeeksComplications")
                        .HasColumnType("text");

                    b.Property<string>("FirstTwoWeeksComplicationsYesOther")
                        .HasColumnType("text");

                    b.Property<string>("FurtherInformation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool?>("HasAnyDischarge")
                        .HasColumnType("boolean");

                    b.Property<bool?>("HasReturnedToNormalBehaviour")
                        .HasColumnType("boolean");

                    b.Property<bool?>("HasReturnedToNormalSelf")
                        .HasColumnType("boolean");

                    b.Property<string>("HasSurgicalSiteHealed")
                        .HasColumnType("text");

                    b.Property<string>("HasSurgicalSiteHealedOther")
                        .HasColumnType("text");

                    b.Property<string>("HasSwellingAtSurgicalSite")
                        .HasColumnType("text");

                    b.Property<string>("HasSwellingAtSurgicalSiteOther")
                        .HasColumnType("text");

                    b.Property<bool?>("HasSwellingPresentAtSurgicalSite")
                        .HasColumnType("boolean");

                    b.Property<string>("HasWoundDischarge")
                        .HasColumnType("text");

                    b.Property<string>("HasWoundDischargeOther")
                        .HasColumnType("text");

                    b.Property<bool?>("IsProtrudingFromSurgicalSite")
                        .HasColumnType("boolean");

                    b.Property<string>("IsStiffOrLame")
                        .HasColumnType("text");

                    b.Property<int?>("PictogramPainScore")
                        .HasColumnType("integer");

                    b.Property<string>("RequiredVetOrComplications")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("SurveyCompletion")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("SurveyTypeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CaseId");

                    b.HasIndex("SurveyTypeId");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.SurveyType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SurveyTypes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Case", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.Veterinarian", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("EquineCastration.Data.Entities.Horse", "Horse")
                        .WithMany()
                        .HasForeignKey("HorseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EquineCastration.Data.Entities.Identity.Owner", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.Navigation("Author");

                    b.Navigation("Horse");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Horse", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.Owner", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.Owner", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", "ApplicationUser")
                        .WithOne("Owner")
                        .HasForeignKey("EquineCastration.Data.Entities.Identity.Owner", "ApplicationUserId");

                    b.Navigation("ApplicationUser");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.Veterinarian", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", "ApplicationUser")
                        .WithOne("Veterinarian")
                        .HasForeignKey("EquineCastration.Data.Entities.Identity.Veterinarian", "ApplicationUserId");

                    b.Navigation("ApplicationUser");
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Survey", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Case", "Case")
                        .WithMany()
                        .HasForeignKey("CaseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EquineCastration.Data.Entities.SurveyType", "SurveyType")
                        .WithMany()
                        .HasForeignKey("SurveyTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Case");

                    b.Navigation("SurveyType");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("EquineCastration.Data.Entities.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EquineCastration.Data.Entities.Identity.ApplicationUser", b =>
                {
                    b.Navigation("Owner");

                    b.Navigation("Veterinarian");
                });
#pragma warning restore 612, 618
        }
    }
}