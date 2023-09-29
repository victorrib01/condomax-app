import { Button } from "react-native-ui-lib";
import { ButtonTypes } from "./types";

export const ButtonCustom = ({ label, onPress, ...props }: ButtonTypes) => {
  return <Button white label={label} onPress={onPress} {...props} />;
};
