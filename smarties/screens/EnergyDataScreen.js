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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#AEFF4C",
    fontSize: 16,
    marginBottom: 30,
  },
  gif: {
    width: 400,
    height: 300,
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 20,
  },
});
