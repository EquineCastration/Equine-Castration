namespace EquineCastration.Data.Entities.Identity;

public class Owner
{
  public int Id { get; set; }
  public string Email { get; set; } = string.Empty;
  public string? ApplicationUserId { get; set; }
  public ApplicationUser ApplicationUser { get; set; } = null!;
}
