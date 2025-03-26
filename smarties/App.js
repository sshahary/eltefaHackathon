// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screens
import HomeScreen from "./screens/HomeScreen";
import DevicesScreen from "./screens/DevicesScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import EnergyDataScreen from "./screens/EnergyDataScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Hide the default header and use our own styling */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Photovoltaik" component={DevicesScreen} />
        <Stack.Screen name="Geräte" component={StatisticsScreen} />
        <Stack.Screen name="3D-Rendering" component={EnergyDataScreen} />
        <Stack.Screen name="Einstellungen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

