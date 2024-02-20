using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using EquineCastration.Data.Entities;
using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { }
  public DbSet<FeatureFlag> FeatureFlags => Set<FeatureFlag>();
  
  public DbSet<RegistrationRule> RegistrationRules => Set<RegistrationRule>();
  
  public DbSet<Case> Cases => Set<Case>();
  
  public DbSet<Horse> Horses => Set<Horse>();
  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);
    
    builder.Entity<ApplicationUser>()
      .HasOne(x => x.Veterinarian)
      .WithOne(x => x.ApplicationUser)
      .HasForeignKey<Veterinarian>(x => x.ApplicationUserId)
      .IsRequired(false);
    
    builder.Entity<ApplicationUser>()
      .HasOne(x => x.Owner)
      .WithOne(x => x.ApplicationUser)
      .HasForeignKey<Owner>(x => x.ApplicationUserId)
      .IsRequired(false);
  }
}
