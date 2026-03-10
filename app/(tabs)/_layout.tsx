import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { FinancialProvider } from "../context/FinancialContext";

export default function TabLayout() {
  return (
    <FinancialProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size ?? 28} />
            ),
          }}
        />
        <Tabs.Screen
          name="risk"
          options={{
            title: "Risk",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="alert-circle" color={color} size={size ?? 28} />
            ),
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            title: "Analysis",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-pie" color={color} size={size ?? 28} />
            ),
          }}
        />
        <Tabs.Screen
          name="coach"
          options={{
            title: "Coach",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="robot" color={color} size={size ?? 28} />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-open" color={color} size={size ?? 28} />
            ),
          }}
        />
      </Tabs>
    </FinancialProvider>
  );
}