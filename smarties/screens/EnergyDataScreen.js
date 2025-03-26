// screens/EnergyDataScreen.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EnergyDataScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>3D Rendering</Text>
      <Text style={styles.subtitle}>View real-time energy info</Text>

      {/* Display the 3D model GIF */}
      <Image
        source={require("../assets/3d.gif")}
        style={styles.gif}
        resizeMode="contain"
      />

      <Text style={styles.infoText}>Dies ist eine Demo eines 3D-Modells</Text>
    </SafeAreaView>
  );
}

const ACCENT_COLOR = "#AEFF4C";
const DARK_BG = "#1E1E1E";
const LIGHT_TEXT = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: LIGHT_TEXT,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: ACCENT_COLOR,
    fontSize: 16,
    marginBottom: 30,
  },
  gif: {
    width: 400,
    height: 300,
  backButton: {
    backgroundColor: "#2B2B2B",
    padding: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: LIGHT_TEXT,
    fontSize: 16,
  },
}});
