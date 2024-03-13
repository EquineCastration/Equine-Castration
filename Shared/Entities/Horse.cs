using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Data.Entities;

public class Horse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public Owner Owner { get; set; } = null!;
}
