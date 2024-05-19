namespace EquineCastration.Config;

public class AppRequestHeaderOptions
{
  public bool CheckHeader { get; init; } = true;
  public string Name { get; init; } = "X-Equine-Castration-Identifier";
  public string Value { get; init; } = "Equine-Castration";
}
