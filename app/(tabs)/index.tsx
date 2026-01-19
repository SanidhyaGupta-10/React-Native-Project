import { Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import createHomeStyles from "../styles/home.style";


export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      key={colors.bg}
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.bg}
        translucent={false}
      />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TouchableOpacity
          onPress={toggleDarkMode}
        >
          <Text>Toggle Dark Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}