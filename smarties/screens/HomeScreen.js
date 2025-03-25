// screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energy Management</Text>
      <Text style={styles.subtitle}>Welcome, Smarties</Text>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Devices")}
      >
        <Text style={styles.menuButtonText}>Devices</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Statistics")}
      >
        <Text style={styles.menuButtonText}>Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("EnergyData")}
      >
        <Text style={styles.menuButtonText}>Energy Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.menuButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// Theme constants
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
    fontSize: 18,
    marginBottom: 30,
  },
  menuButton: {
    width: "70%",
    backgroundColor: "#2B2B2B",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  menuButtonText: {
    color: LIGHT_TEXT,
    fontSize: 16,
    fontWeight: "600",
  },
});
