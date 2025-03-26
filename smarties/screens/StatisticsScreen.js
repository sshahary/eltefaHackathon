import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function SettingsScreen({ navigation }) {
  const [threshold, setThreshold] = useState(69); // Startwert in der Mitte (entspricht 50 kW)
  const [items, setItems] = useState([
    { id: 1, name: "Medizinische Geräte", minThreshold: 2, status: true },
    { id: 2, name: "Server", minThreshold: 10, status: false },
    { id: 3, name: "Wärmepumpe", minThreshold: 50, status: true },
    { id: 4, name: "Steckdosen Lehrerpult", minThreshold: 2, status: false },
    { id: 5, name: "Licht", minThreshold: 15, status: true },
    { id: 6, name: "Steckdosen Schüler", minThreshold: 3, status: false },
    { id: 7, name: "Wallbox", minThreshold: 25, status: true },
  ]);

  // Direktes Anzeigen des Schwellenwerts in kW (keine Umrechnung nötig)
  const getThresholdInKW = (value) => value; // Direkt den Wert anzeigen, keine Umrechnung mehr nötig

  // Slider-Wertänderung
  const handleSliderChange = (value) => {
    setThreshold(value);
    // Direktes Update des Geräte-Status basierend auf dem Schwellenwert
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        status: value >= item.minThreshold, // Gerät wird aktiviert, wenn der Schwellenwert erreicht wird
      }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geräte</Text>

      <Text style={styles.sliderLabel}>
        Verfügbarer Strom: {getThresholdInKW(threshold)} kW
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0} // 0 kW
        maximumValue={80} // 120 kW
        step={1} // Schrittweise in Ganzzahlen
        value={threshold}
        onValueChange={handleSliderChange} // Wert beim Ziehen ändern
      />

      {items.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <Text style={styles.itemText}>{item.name}</Text>
          {/* An/Aus Knopf zum Umschalten des Status */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              { backgroundColor: item.status ? "green" : "red" },
            ]}
            onPress={() => {
              setItems(prevItems =>
                prevItems.map(i =>
                  i.id === item.id ? { ...i, status: !i.status } : i
                )
              );
            }}
          >
            <Text style={styles.statusButtonText}>
              {item.status ? "An" : "Aus"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Zurück</Text>
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
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  statusButtonText: {
    color: LIGHT_TEXT,
    fontSize: 16,
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

