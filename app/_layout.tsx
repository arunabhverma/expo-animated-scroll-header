import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import "react-native-reanimated";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      subtitle: string;
      paragraph: string;
      overlay: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    subtitle: "#EEEEEE",
    paragraph: "#DDDDDD",
    overlay: "rgba(0,0,0,0.4)",
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    subtitle: "#333333",
    paragraph: "#222222",
    overlay: "rgba(255,255,255,0.1)",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? dark : light}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTintColor:
            colorScheme === "dark" ? dark.colors.text : light.colors.text,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="city"
          options={{
            title: "",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
