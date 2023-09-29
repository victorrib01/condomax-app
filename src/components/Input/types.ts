import { TextFieldProps } from "react-native-ui-lib";

export type InputTypes = TextFieldProps & {
  placeholder: string;
  onChangeText: (text: string) => void;
};
