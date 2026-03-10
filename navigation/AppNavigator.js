import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import RiskScreen from "../screens/RiskScreen";
import CoachScreen from "../screens/CoachScreen";

import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Risk" component={RiskScreen} />
      <Tab.Screen name="Coach AI" component={CoachScreen} />
    </Tab.Navigator>
  );
}