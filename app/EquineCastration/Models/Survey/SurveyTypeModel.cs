namespace EquineCastration.Models.Survey;

public record SurveyTypeModel(int Id, string Name, int DaysAfterCase);
public record EligibleSurveyTypeModel(SurveyTypeModel SurveyType, int PostOpDays);
