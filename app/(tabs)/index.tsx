// app/index.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";
import {getDebtRisk} from "../services/aiService";

export default function HomeScreen() {
  const { budget } = useContext(FinancialContext);

  const totalSpending = budget.reduce((sum, b) => sum + (b.amount ?? 0), 0);

  const [riskScore, setRiskScore] = useState(0);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    loadRisk();
  }, []);

  const loadRisk = async () => {
    const data = await getDebtRisk(2500, 2000, 4, 1);

    if (data){
      setRiskScore(data.risk_score);
      setInsight(data.insight);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerRow}>
        <View style={styles.logoWrapper}>
           <Image source={require('../../assets/images/debtsense.png')} style={styles.logoImage}/>
          <Text style={styles.logoLabel}>DebtSense</Text>
        </View>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeSmall}>Welcome back</Text>
          <Text style={styles.welcomeName}>Ahmad</Text>
        </View>
      </View>
          <Text style={styles.subtitle}>Your Financial Health Assistant</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Spending</Text>
        <Text style={styles.amount}>RM {totalSpending}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Debt Risk Score</Text>
        <Text style={styles.risk}>{riskScore} / 100 (Medium)</Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 AI Insight</Text>
        <Text>
          {insight}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    flexDirection: "column",
    backgroundColor: "#6A0DAD",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 24,
    marginBottom: 20,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: "100%"
  },
 headerRow: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between",
   marginBottom: 8,
 },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff"
  },
  logoLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  welcomeWrapper: {
    alignItems: "flex-end",
  },
  welcomeSmall: {
    fontSize: 30,
    color: "rgba(255,255,255,0.75)",
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  // Body
  subtitle: {color: "rgba(255,255,255,0.75)", fontSize: 16, marginLeft: 1 },
  card: { backgroundColor: colors.card, padding: 20, borderRadius: 15, marginBottom: 15 },
  cardTitle: { fontWeight: "600" },
  amount: { fontSize: 24, color: colors.secondary },
  risk: { fontSize: 22, color: colors.warning },
  tipCard: { backgroundColor: colors.highlight, padding: 18, borderRadius: 15 },
  tipTitle: { fontWeight: "bold", marginBottom: 5 },
});
