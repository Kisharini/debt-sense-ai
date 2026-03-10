// app/risk.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";

export default function Risk() {
  const { debts } = useContext(FinancialContext);

  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
  const riskScore = Math.min(Math.round((totalDebt / 1000) * 100), 100);

  const riskLabel =
    riskScore > 70 ? "High Risk" : riskScore > 40 ? "Moderate Risk" : "Low Risk";

  const aiTip =
    riskScore > 70
      ? "⚠️ Your debt is high. Prioritize paying PayLater first."
      : "✅ Your debts are manageable. Keep monitoring monthly.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debt Risk Score</Text>
      <View style={styles.circle}>
        <Text style={styles.score}>{riskScore}</Text>
      </View>
      <Text style={styles.label}>{riskLabel}</Text>
      <Text style={styles.description}>{aiTip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: colors.primary },
  circle: { width: 160, height: 160, borderRadius: 80, backgroundColor: colors.secondary, justifyContent: "center", alignItems: "center" },
  score: { fontSize: 50, color: "white", fontWeight: "bold" },
  label: { fontSize: 20, marginTop: 20 },
  description: { marginTop: 10, paddingHorizontal: 40, textAlign: "center" },
});