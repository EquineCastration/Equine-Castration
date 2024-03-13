import { initialConsultation } from "constants/initial-consultation";
import { useStyle } from "contexts/StyleProvider";
import { View } from "react-native";
import { spacing } from "style";
import { Text } from "./Text";

const Field = ({ label, value }) => {
  const { colors: colorScheme } = useStyle();

  return (
    <View
      style={{
        marginVertical: spacing.xxs,
        padding: spacing.sm,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colorScheme.border,
        alignItems: "center",
        gap: spacing.xs,
      }}
    >
      <Text
        style={{
          color: colorScheme.tint,
          maxWidth: "65%",
        }}
      >
        {label}
      </Text>
      <Text>-</Text>
      <Text
        weight="semiBold"
        style={{
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const formatValue = (value) => {
  switch (typeof value) {
    case "boolean":
      return value ? "Yes" : "No";
    case "object":
      return Array.isArray(value) ? value.join(", ") : value.toString();
    default:
      return value.toString();
  }
};

const isValidValue = (value) =>
  value != null && // not null or undefined
  value !== 0 && // not 0
  value !== "" && // not empty string
  !(Array.isArray(value) && value.length === 0); // not empty array

export const CaseSummary = ({ data }) => {
  const fields = initialConsultation.fields;

  return (
    <>
      {Object.entries(data.horse).map(([key, value]) =>
        isValidValue(value) ? (
          <Field
            key={key}
            label={fields.horse[key]?.label}
            value={formatValue(value)}
          />
        ) : null
      )}
      {Object.entries(data).map(([key, value]) =>
        isValidValue(value) && key !== "horse" ? (
          <Field
            key={key}
            label={fields[key]?.label}
            value={formatValue(value)}
          />
        ) : null
      )}
    </>
  );
};
