// screens/DataStatisticsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import Papa from "papaparse";
import { Picker } from "@react-native-picker/picker";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Example CSV data (in your project, this could be loaded from a local file or fetched from a server)
const sampleCsvData = `timestamp,consumption,solar
2025-03-25T08:00:00,45,10
2025-03-25T09:00:00,40,15
2025-03-25T10:00:00,38,20
2025-03-25T11:00:00,36,28
2025-03-25T12:00:00,42,35
`;

export default function DataStatisticsScreen({ navigation }) {
  const [parsedData, setParsedData] = useState([]);
  const [selectedField, setSelectedField] = useState("consumption");

  useEffect(() => {
    // Parse CSV data on mount
    Papa.parse(sampleCsvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          Alert.alert("CSV Parse Error", JSON.stringify(results.errors));
        } else {
          setParsedData(results.data);
        }
      },
    });
  }, []);

  // Calculate statistics for the selected field
  const fieldValues = parsedData.map((item) => Number(item[selectedField]));
  const average =
    fieldValues.reduce((acc, cur) => acc + cur, 0) / (fieldValues.length || 1);
  const min = fieldValues.length ? Math.min(...fieldValues) : 0;
  const max = fieldValues.length ? Math.max(...fieldValues) : 0;

  // Prepare chart data (labels derived from timestamps)
  const labels = parsedData.map((item) => {
    const date = new Date(item.timestamp);
    return `${date.getHours()}:00`;
  });
  const chartData = {
    labels,
    datasets: [
      {
        data: fieldValues,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Statistics</Text>
      <Text style={styles.subtitle}>Select data type:</Text>
      <Picker
        selectedValue={selectedField}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedField(itemValue)}
      >
        <Picker.Item label="Consumption" value="consumption" />
        <Picker.Item label="Solar" value="solar" />
      </Picker>

      {parsedData.length > 0 ? (
        <>
          <BarChart
            data={chartData}
            width={screenWidth * 0.9}
            height={220}
            fromZero
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#1E1E1E",
              backgroundGradientTo: "#1E1E1E",
              color: () => ACCENT_COLOR,
              labelColor: () => "#AAA",
              barPercentage: 0.5,
            }}
            style={{ borderRadius: 8 }}
          />

          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Average: {average.toFixed(2)}</Text>
            <Text style={styles.statsText}>Min: {min}</Text>
            <Text style={styles.statsText}>Max: {max}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Parsing CSV data...</Text>
      )}
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
    padding: 20,
  },
  title: {
    color: LIGHT_TEXT,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    color: ACCENT_COLOR,
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "80%",
    color: LIGHT_TEXT,
    backgroundColor: "#2B2B2B",
    marginBottom: 20,
  },
  loadingText: {
    color: LIGHT_TEXT,
    fontSize: 16,
    marginTop: 20,
  },
  statsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statsText: {
    color: LIGHT_TEXT,
    fontSize: 16,
    marginVertical: 2,
  },
});
