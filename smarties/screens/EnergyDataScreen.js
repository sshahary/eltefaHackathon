// screens/EnergyDataScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EnergyDataScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energy Data</Text>
      <Text style={styles.subtitle}>View real-time energy info</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
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
  backButton: {
    backgroundColor: "#2B2B2B",
    padding: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: LIGHT_TEXT,
    fontSize: 16,
  },
});
