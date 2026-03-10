// app/index.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";

export default function HomeScreen() {
  const { budget } = useContext(FinancialContext);

  const totalSpending = budget.reduce((sum, b) => sum + (b.amount ?? 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DebtSense AI</Text>
      <Text style={styles.subtitle}>Your Financial Health Assistant</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Spending</Text>
        <Text style={styles.amount}>RM {totalSpending}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Debt Risk Score</Text>
        <Text style={styles.risk}>62 / 100</Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>AI Insight</Text>
        <Text>
          Your PayLater spending increased by 30% this month.
          Consider reducing impulse purchases.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: colors.primary },
  subtitle: { marginBottom: 25, color: colors.secondary },
  card: { backgroundColor: colors.card, padding: 20, borderRadius: 15, marginBottom: 15 },
  cardTitle: { fontWeight: "600" },
  amount: { fontSize: 24, color: colors.secondary },
  risk: { fontSize: 22, color: colors.warning },
  tipCard: { backgroundColor: colors.highlight, padding: 18, borderRadius: 15 },
  tipTitle: { fontWeight: "bold", marginBottom: 5 },
});