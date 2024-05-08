namespace EquineCastration.Data.Entities.Identity;

public class Owner
{
  public string Id { get; set; } = "Ow_" + Guid.NewGuid();
  public string Email { get; set; } = string.Empty;
  public string? ApplicationUserId { get; set; }
  public ApplicationUser ApplicationUser { get; set; } = null!;
  public bool OptOut { get; set; }
}
