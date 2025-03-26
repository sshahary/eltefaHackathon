import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider"

export default function SettingsScreen({ navigation }) {
  const [threshold, setThreshold] = useState(50); // Startwert in der Mitte (entspricht 5.0 kW)
  const [items, setItems] = useState([
    { id: 1, name: "Wallbox", power: 2000, minThreshold: 50 }, // 2 kW (2000 W)
    { id: 2, name: "Medizinische Geräte", power: 3000, minThreshold: 50 }, // 3 kW (3000 W)
    { id: 3, name: "Steckdosen", power: 1000, minThreshold: 150 }, // 1 kW (1000 W)
    { id: 4, name: "Licht", power: 500, minThreshold: 150 }, // 0.5 kW (500 W)
    { id: 5, name: "Wärmepumpe", power: 4000, minThreshold: 150 }, // 4 kW (4000 W)
  ]);

  // Funktion zum Berechnen des Wertes in kW
  const getThresholdInKW = (value) => {
    return value / 10;
  };

  const handleSliderChange = (value) => {
    setThreshold(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Adjust your preferences</Text>

      <Text style={styles.sliderLabel}>
        Verfügbarer Strom: {getThresholdInKW(threshold)} kW
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0} // 0 (0 kW)
        maximumValue={300} // 300 (30 kW)
        step={1} // Schrittweise in Ganzzahlen
        value={threshold}
        onValueChange={handleSliderChange} // Wert beim Ziehen ändern
      />

      {items.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <Text style={styles.itemText}>
            {item.name} ({item.power} W)
          </Text>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: threshold >= item.minThreshold ? "green" : "red" },
            ]}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
  sliderLabel: {
    color: LIGHT_TEXT,
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: "80%",
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  itemText: {
    color: LIGHT_TEXT,
    fontSize: 18,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: "#2B2B2B",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: LIGHT_TEXT,
    fontSize: 16,
  },
});
