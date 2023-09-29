import { ButtonProps } from "react-native-ui-lib";

export type ButtonTypes = ButtonProps & {
  label: string;
  onPress: (input: any) => void;
};
