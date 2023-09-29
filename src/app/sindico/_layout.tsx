import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, View, Text } from "react-native";
import { useSession } from "~/contexts/auth";
import { Redirect, Tabs } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const SomeComponent = () => {
  return <Text>Some Component</Text>;
};

interface IconProps {
  size: number;
  color: string;
}

const createTabIcon =
  (name: string) =>
  ({ size, color }: IconProps) =>
    <MaterialIcons name={name as any} size={size} color={color} />;

const TAB_ROUTES = [
  {
    name: "home",
    icon: createTabIcon("home"),
  },
  {
    name: "profile",
    icon: createTabIcon("person"),
  },
  {
    name: "settings",
    icon: createTabIcon("settings"),
  },
];

const TabContent = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    {TAB_ROUTES.map((route) => (
      <Tabs.Screen key={route.name} name={route.name} {...(route as any)} />
    ))}
  </Tabs>
);

const DRAWER_ROUTES = [
  {
    name: "Inicio",
    component: TabContent, // Usando o componente de abas aqui
  },
  // Adicione mais rotas aqui
];

export default function TabRoutesLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer.Navigator initialRouteName="Inicio">
      {DRAWER_ROUTES.map((route) => (
        <Drawer.Screen
          name={route.name}
          component={route.component}
          key={route.name}
        />
      ))}
    </Drawer.Navigator>
  );
}
