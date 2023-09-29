import { TextField } from "react-native-ui-lib";
import { InputTypes } from "./types";

export const Input = ({ placeholder, onChangeText, ...props }: InputTypes) => {
  return (
    <TextField
      text80
      placeholder={placeholder}
      onChangeText={onChangeText}
      color={"#0097B2"}
      floatingPlaceholderStyle={{
        color: "#0097B2",
        paddingBottom: 10,
        fontWeight: "700",
      }}
      labelStyle={{
        color: "#0097B2",
        marginRight: 20,
      }}
      fieldStyle={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 5,
      }}
      placeholderTextColor={"#0097B2"}
      {...props}
    />
  );
};
