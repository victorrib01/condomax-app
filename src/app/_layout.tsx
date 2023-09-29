import { useEffect } from "react";
import { Text, View } from "react-native";
import { SplashScreen, Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth";

// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Uncomment below lines if you're planning to load fonts
  // const FONT_NAME = "Inter_500Medium";
  // const [fontsLoaded, fontError] = useFonts({
  //   [FONT_NAME]: require('path-to-font-file'),
  // });

  useEffect(() => {
    // Uncomment below lines if you're planning to load fonts
    // if (fontsLoaded || fontError) {
    // Hide the splash screen when all assets (like fonts) are loaded
    SplashScreen.hideAsync();
    // }
  }, []);

  // Uncomment below lines if you're planning to load fonts
  // Prevent rendering until the font has loaded or an error was returned
  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  return (
    // Provide session context to children
    <SessionProvider>
      {/* Slot for rendering children routes */}
      <Slot />
    </SessionProvider>
  );
}
