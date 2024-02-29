namespace EquineCastration.Models.Survey;

public record SurveyTypeModel(int Id, string Name);
public record EligibleSurveyTypeModel(SurveyTypeModel SurveyType, int PostOpDays);
