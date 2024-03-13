
using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Account.Register;

public record RegisterAccountModel(
  [Required]
  [DataType(DataType.Text)]
  string FullName,

  [Required]
  [EmailAddress]
  string Email,

  [Required]
  [DataType(DataType.Password)]
  string Password,
  
  [Required]
  bool IsVeterinarian, // Vet or Horse owner ?
  
  string Institution,
  
  bool IsAmbulatory,
  
  int YearsQualified
);
