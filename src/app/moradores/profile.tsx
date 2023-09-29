import React from "react";
import { View, Text, Avatar } from "react-native-ui-lib";

export default function Profile() {
  return (
    <View flex padding-20>
      <View center>
        <Avatar size={100} label="JD" backgroundColor="#3498db" />
        <Text text50M marginT-10>
          John Doe
        </Text>
      </View>
      <View flex center marginT-20>
        <Text text70L>
          This is your profile! Feel free to add more components or data here.
        </Text>
      </View>
    </View>
  );
}
