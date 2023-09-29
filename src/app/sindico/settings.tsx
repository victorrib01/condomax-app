import { Text, View } from "react-native";
import { useSession } from "~/contexts/auth";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 44,
          fontWeight: "700",
        }}
      >
        Settings
      </Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );
}
