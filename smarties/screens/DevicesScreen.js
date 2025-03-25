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

// Mock-Daten für verschiedene Produktionsszenarien
const productionData = {
  all: {
    totalUsage: 322.64, // kWh
  },
  fassade: {
    totalUsage: 28.01, // kWh
  },
  container: {
    totalUsage: 95.75, // kWh
  },
  haupt: {
    totalUsage: 198.88, // kWh
  }
};

// Mock-Daten für verschiedene Produktionsszenarien
const currentData = {
  all: {
    totalUsage: 67.26, // kWh
  },
  fassade: {
    totalUsage: 6.63, // kWh
  },
  container: {
    totalUsage: 19.88, // kWh
  },
  haupt: {
    totalUsage: 40.75, // kWh
  }
};

// Anpassung der Chartdaten für verschiedene Szenarien
const dayData = {
  all: [12.5, 15.3, 14.7, 16.2, 13.9, 17.6, 16.8],
  fassade: [28, 31, 25, 27, 33, 28, 30],
  container: [95, 98, 91, 87, 93, 102, 95],
  haupt: [198, 203, 185, 182, 197, 200, 182]
};

const weekData = {
  all: [2258],
  fassade: [196],
  container: [670],
  haupt: [1392]
};

const monthData = {
  all: [8065],
  fassade: [700],
  container: [2393],
  haupt: [4972]
};

export default function StatisticsScreen() {
  const [scenario, setScenario] = useState("all");
  const [range, setRange] = useState("Tag");

  // Aktuelles Szenario auswählen
  const mockData = productionData[scenario];
  const mockData_current = currentData[scenario];

  // Pick which data to show based on the range
  let chartValues = {
    "Tag": dayData[scenario],
    "Woche": weekData[scenario],
    "Monat": monthData[scenario]
  }[range];

  // Prepare chart data
  const chartData = {
    labels:
      range === "Tag"
        ? ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        : range === "Woche"
        ? ["KW13", "KW14", "KW15", "KW16", "KW17"]
        : ["Mar", "Apr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        data: chartValues,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Willkommen zurück</Text>
        <Text style={styles.userName}>Richard</Text>
      </View>

      {/* Scenario Tabs in 2x2 Grid */}
      <View style={styles.scenarioGrid}>
        <View style={styles.scenarioRow}>
          <TouchableOpacity
            style={[styles.scenarioButton, scenario === "all" && styles.activeScenarioButton]}
            onPress={() => setScenario("all")}
          >
            <Text style={[
              styles.scenarioButtonText, 
              scenario === "all" && styles.activeScenarioButtonText
            ]}>
              Alle
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.scenarioButton, scenario === "fassade" && styles.activeScenarioButton]}
            onPress={() => setScenario("fassade")}
          >
            <Text style={[
              styles.scenarioButtonText, 
              scenario === "fassade" && styles.activeScenarioButtonText
            ]}>
              Fassade
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scenarioRow}>
          <TouchableOpacity
            style={[styles.scenarioButton, scenario === "container" && styles.activeScenarioButton]}
            onPress={() => setScenario("container")}
          >
            <Text style={[
              styles.scenarioButtonText, 
              scenario === "container" && styles.activeScenarioButtonText
            ]}>
              Container
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.scenarioButton, scenario === "haupt" && styles.activeScenarioButton]}
            onPress={() => setScenario("haupt")}
          >
            <Text style={[
              styles.scenarioButtonText, 
              scenario === "haupt" && styles.activeScenarioButtonText
            ]}>
              Hauptbau 
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Usage */}
      <View style={styles.totalUsageCard}>
        <Text style={styles.totalUsageValue}>
          {mockData_current.totalUsage.toFixed(2)} kW
        </Text>
        <Text style={styles.totalUsageLabel}>Aktuelle Leistung</Text>
      </View>

      <View style={styles.totalUsageCard}>
        <Text style={styles.totalUsageValue}>
          {mockData.totalUsage.toFixed(2)} kWh
        </Text>
        <Text style={styles.totalUsageLabel}>Stromproduktion pro Tag</Text>
      </View>

      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Statistiken</Text>

        {/* Range Tabs */}
        <View style={styles.rangeTabContainer}>
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
  scenarioGrid: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  scenarioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scenarioButton: {
    width: "48%",
    backgroundColor: "#2B2B2B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeScenarioButton: {
    backgroundColor: ACCENT_COLOR,
  },
  scenarioButtonText: {
    color: SUBTEXT,
    fontSize: 16,
  },
  activeScenarioButtonText: {
    color: DARK_BG,
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
  statisticsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: LIGHT_TEXT,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  rangeTabContainer: {
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