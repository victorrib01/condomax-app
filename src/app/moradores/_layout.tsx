import { Redirect, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";
import { useSession } from "~/contexts/auth";

interface IconProps {
  size: number;
  color: string;
}

// Utility function to create tab bar icon
const createTabIcon =
  (name: string) =>
  ({ size, color }: IconProps) =>
    <MaterialIcons name={name as any} size={size} color={color} />;

// Route names and options
const ROUTES = [
  {
    name: "home",
    title: "Início",
    icon: createTabIcon("home"),
  },
  {
    name: "profile",
    title: "Perfil",
    icon: createTabIcon("person"),
  },
  {
    name: "settings",
    title: "Configurações",
    icon: createTabIcon("settings"),
  },
];

export default function TabRoutesLayout() {
  const { session, isLoading } = useSession();

  // Show loading indicator if session data is still loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Redirect to login if the session is not available
  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {ROUTES.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            tabBarIcon: route.icon,
          }}
        />
      ))}
    </Tabs>
  );
}
