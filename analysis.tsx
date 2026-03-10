import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";

const screenWidth = Dimensions.get("window").width;

export default function Analysis() {
  const { debts } = useContext(FinancialContext);

  const data = debts.map((d, i) => ({
    name: d.name,
    population: d.amount,
    color: ["#F39C12", "#1F7A8C", "#8C3FD1", "#E74C3C"][i % 4], // fallback colors
    legendFontColor: colors.secondary,
    legendFontSize: 14,
  }));

  // If no debts, add placeholder
  if (data.length === 0) {
    data.push({
      name: "No Data",
      population: 1,
      color: "#bdc3c7",
      legendFontColor: colors.secondary,
      legendFontSize: 14,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Breakdown</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          strokeWidth: 2,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: colors.primary },
});