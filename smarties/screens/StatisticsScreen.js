// // screens/StatisticsScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
// import Papa from "papaparse";
// import { Asset } from "expo-asset";
// import * as FileSystem from "expo-file-system";
// import { BarChart } from "react-native-chart-kit";
// import { Picker } from "@react-native-picker/picker";

// const screenWidth = Dimensions.get("window").width;

// export default function StatisticsScreen({ navigation }) {
//   const [data, setData] = useState([]); // Array of data objects (each row)
//   const [headers, setHeaders] = useState([]); // Array of column names
//   const [selectedColumn, setSelectedColumn] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadCsv() {
//       try {
//         // Load the CSV file as an asset
//         const asset = Asset.fromModule(require("../assets/myData.csv"));
//         await asset.downloadAsync();
//         // Read the file content as a string
//         const csvString = await FileSystem.readAsStringAsync(asset.localUri);
//         // Parse as array of arrays using semicolon as delimiter
//         const results = Papa.parse(csvString, {
//           delimiter: ";",
//           skipEmptyLines: true,
//         });
//         if (results.errors.length) {
//           Alert.alert("CSV Parse Error", JSON.stringify(results.errors));
//           setLoading(false);
//           return;
//         }
//         const rows = results.data; // rows is an array of arrays

//         // Expecting at least 5 rows:
//         // Row 0: names, Row 1: units, Row 2: descriptions, Row 3: header for timestamp, Row 4+: data rows.
//         if (rows.length < 5) {
//           Alert.alert("CSV Error", "Not enough rows in CSV");
//           setLoading(false);
//           return;
//         }

//         // Build headers:
//         // For column 0, use the value from row 3 (e.g., "Timestamp :") without the colon.
//         const computedHeaders = [];
//         computedHeaders.push(
//           rows[3][0] ? rows[3][0].replace(":", "").trim() : "Timestamp"
//         );
//         // For columns 1 onward, use row 0 (the "Name :" row) and remove extra quotes.
//         for (let i = 1; i < rows[0].length; i++) {
//           let header = rows[0][i]
//             ? rows[0][i].replace(/"/g, "").trim()
//             : `Column ${i}`;
//           computedHeaders.push(header);
//         }
//         setHeaders(computedHeaders);

//         // Process data rows (starting from row index 4)
//         const dataRows = rows.slice(4).map((row) => {
//           const obj = {};
//           for (let i = 0; i < computedHeaders.length; i++) {
//             let value = row[i] ? row[i].replace(/"/g, "").trim() : "";
//             // For numeric columns (i > 0), remove internal spaces and try converting to a number
//             if (i > 0 && value !== "") {
//               const numericString = value.replace(/\s/g, "");
//               const numberValue = Number(numericString);
//               value = isNaN(numberValue) ? value : numberValue;
//             }
//             obj[computedHeaders[i]] = value;
//           }
//           return obj;
//         });
//         setData(dataRows);

//         // Set a default column (first numeric column) if available
//         if (computedHeaders.length > 1) {
//           setSelectedColumn(computedHeaders[1]);
//         }
//         setLoading(false);
//       } catch (error) {
//         Alert.alert("Error", error.message);
//         setLoading(false);
//       }
//     }
//     loadCsv();
//   }, []);

//   // Compute statistics for the selected column (if it's not the timestamp)
//   let numericValues = [];
//   if (selectedColumn && selectedColumn !== "Timestamp") {
//     numericValues = data
//       .map((row) => {
//         const val = row[selectedColumn];
//         return typeof val === "number" ? val : NaN;
//       })
//       .filter((v) => !isNaN(v));
//   }
//   const average = numericValues.length
//     ? numericValues.reduce((acc, val) => acc + val, 0) / numericValues.length
//     : 0;
//   const min = numericValues.length ? Math.min(...numericValues) : 0;
//   const max = numericValues.length ? Math.max(...numericValues) : 0;

//   // Prepare chart data: use timestamps as labels (from the first column)
//   const labels = data.map((row) => {
//     let ts = row[headers[0]];
//     if (ts && ts.length >= 16) {
//       // Extract "HH:MM" from "YYYY-MM-DD HH:MM:SS"
//       return ts.substring(11, 16);
//     }
//     return ts;
//   });
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         data: numericValues,
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Statistics</Text>
//       {loading ? (
//         <Text style={styles.loadingText}>Loading CSV data...</Text>
//       ) : (
//         <>
//           <Text style={styles.subtitle}>Select Column:</Text>
//           <Picker
//             selectedValue={selectedColumn}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSelectedColumn(itemValue)}
//           >
//             {/* Exclude the Timestamp column */}
//             {headers.slice(1).map((header, index) => (
//               <Picker.Item key={index} label={header} value={header} />
//             ))}
//           </Picker>
//           {numericValues.length > 0 ? (
//             <>
//               <BarChart
//                 data={chartData}
//                 width={screenWidth * 0.9}
//                 height={220}
//                 fromZero
//                 chartConfig={{
//                   backgroundColor: "#000",
//                   backgroundGradientFrom: "#1E1E1E",
//                   backgroundGradientTo: "#1E1E1E",
//                   color: () => "#AEFF4C", // neon accent
//                   labelColor: () => "#888",
//                   barPercentage: 0.5,
//                 }}
//                 style={{ borderRadius: 8 }}
//               />
//               <View style={styles.statsContainer}>
//                 <Text style={styles.statsText}>
//                   Average: {average.toFixed(2)}
//                 </Text>
//                 <Text style={styles.statsText}>Min: {min}</Text>
//                 <Text style={styles.statsText}>Max: {max}</Text>
//               </View>
//             </>
//           ) : (
//             <Text style={styles.loadingText}>
//               No numeric data available for the selected column.
//             </Text>
//           )}
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1E1E1E",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//   },
//   subtitle: {
//     color: "#AEFF4C",
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   loadingText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//   },
//   picker: {
//     height: 50,
//     width: "80%",
//     color: "#FFFFFF",
//     backgroundColor: "#2B2B2B",
//     marginBottom: 20,
//   },
//   statsContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   statsText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     marginVertical: 2,
//   },
// });

// screens/StatisticsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Mock data for demonstration. In a real app, you’d parse your CSV and
// compute these values (total usage, devices usage, chart data) dynamically.
const mockData = {
  totalUsage: 718.65, // kWh
  temperature: 21, // °C
  devices: [
    { name: "Klimaanlagen", usage: 178 },
    { name: "Computer System", usage: 135 },
    { name: "Heizungen", usage: 207 },
    { name: "Beleuchtungen", usage: 121 },
  ],
};

// Example chart data for day, week, month
const dayData = [3.2, 5.1, 4.8, 6.5, 2.9, 7.2, 5.6];
const weekData = [56.45, 54.65, 58.12, 59.75, 62.3, 64.9, 66.1];
const monthData = [230, 220, 245, 260, 270, 290, 310];

export default function StatisticsScreen() {
  const [range, setRange] = useState("day");

  // Pick which data to show based on the range
  let chartValues;
  switch (range) {
    case "Tag":
      chartValues = dayData;
      break;
    case "Woche":
      chartValues = weekData;
      break;
    case "Monat":
      chartValues = monthData;
      break;
    default:
      chartValues = dayData;
      break;
  }

  // Prepare chart data
  const chartData = {
    labels:
      range === "Tag"
        ? ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        : range === "Woche"
        ? ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7"]
        : ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        data: chartValues,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Willkommen zurück</Text>
        <Text style={styles.userName}>Richard</Text>
        <Text style={styles.temperature}>{mockData.temperature}°C</Text>
      </View>

      {/* Total Usage */}
      <View style={styles.totalUsageCard}>
        <Text style={styles.totalUsageValue}>
          {mockData.totalUsage.toFixed(2)} kWh
        </Text>
        <Text style={styles.totalUsageLabel}>Gesamtverbrauch</Text>
      </View>

      {/* Devices */}
      <View style={styles.devicesContainer}>
        <Text style={styles.sectionTitle}>Devices</Text>
        <View style={styles.devicesGrid}>
          {mockData.devices.map((dev, index) => (
            <View key={index} style={styles.deviceCard}>
              <Text style={styles.deviceName}>{dev.name}</Text>
              <Text style={styles.deviceUsage}>{dev.usage} kWh</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Statistiken</Text>

        {/* Range Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, range === "Tag" && styles.activeTab]}
            onPress={() => setRange("Tag")}
          >
            <Text
              style={[styles.tabText, range === "Tag" && styles.activeTabText]}
            >
              Tag
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, range === "Woche" && styles.activeTab]}
            onPress={() => setRange("Woche")}
          >
            <Text
              style={[
                styles.tabText,
                range === "Woche" && styles.activeTabText,
              ]}
            >
              Woche
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, range === "Monat" && styles.activeTab]}
            onPress={() => setRange("Monat")}
          >
            <Text
              style={[
                styles.tabText,
                range === "Monat" && styles.activeTabText,
              ]}
            >
              Monat
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bar Chart */}
        <BarChart
          data={chartData}
          width={screenWidth * 0.9}
          height={220}
          fromZero
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#1E1E1E",
            backgroundGradientTo: "#1E1E1E",
            color: () => "#AEFF4C",
            labelColor: () => "#888",
            barPercentage: 0.5,
          }}
          style={{ borderRadius: 8 }}
        />
      </View>
    </ScrollView>
  );
}

const ACCENT_COLOR = "#AEFF4C";
const DARK_BG = "#1E1E1E";
const LIGHT_TEXT = "#FFFFFF";
const SUBTEXT = "#AAAAAA";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    color: SUBTEXT,
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    color: LIGHT_TEXT,
    fontSize: 24,
    fontWeight: "600",
  },
  temperature: {
    color: ACCENT_COLOR,
    fontSize: 18,
    marginTop: 8,
  },
  totalUsageCard: {
    backgroundColor: "#2B2B2B",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  totalUsageValue: {
    color: LIGHT_TEXT,
    fontSize: 32,
    fontWeight: "700",
  },
  totalUsageLabel: {
    color: SUBTEXT,
    fontSize: 14,
    marginTop: 5,
  },
  devicesContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: LIGHT_TEXT,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  devicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:
      "space-between",
  },  
  deviceCard: {
    backgroundColor: "#2B2B2B",
    width: "48%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceName: {
    color: LIGHT_TEXT,
    fontSize: 16,
    fontWeight: "600",
  },
  deviceUsage: {
    color: SUBTEXT,
    fontSize: 14,
    marginTop: 4,
  },
  statisticsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: ACCENT_COLOR,
  },
  tabText: {
    color: SUBTEXT,
    fontSize: 16,
  },
  activeTabText: {
    color: DARK_BG,
  },
});