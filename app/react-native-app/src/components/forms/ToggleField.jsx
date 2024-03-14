import { useStyle } from "contexts/StyleProvider";
import { useField } from "formik";
import { spacing } from "style";
import Checkbox from "expo-checkbox";
import { Switch, View } from "react-native";
import { useState } from "react";
import { Text } from "components/Text";

export const ToggleField = ({ variant, name, label, labelColor, ...props }) => {
  const { colors: colorScheme } = useStyle();
  const [field, meta, helpers] = useField(name);
  const [isEnabled, setIsEnabled] = useState(field?.value ?? false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    helpers.setValue(!isEnabled);
  };

  const CheckBox = () => (
    <Checkbox
      style={{ width: 20, height: 20 }}
      value={isEnabled}
      onValueChange={toggleSwitch}
      {...props}
    />
  );

  const SwitchToggle = () => (
    <Switch
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      trackColor={{ false: colorScheme?.tint, true: colorScheme?.active }}
      onValueChange={toggleSwitch}
      value={isEnabled}
      {...props}
    />
  );

  return (
    <View
      style={{
        marginVertical: spacing.xs,
        alignItems: "center",
        padding: spacing.md,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {variant === "checkbox" ? <CheckBox /> : <SwitchToggle />}
        <Text
          preset="formLabel"
          style={{
            color: labelColor ?? colorScheme?.formLabel,
            marginLeft: spacing.sm,
            flex: 1,
          }}
          weight="semiBold"
        >
          {label}
        </Text>
      </View>
    </View>
  );
};
