import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TextInput, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";
import { classifySpending } from "../services/aiService";

const screenWidth = Dimensions.get("window").width;

export default function Analysis() {
  const { debts, addDebt } = useContext(FinancialContext);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState("");

  const groupedDebts: { [key: string]: number } = {};
  debts.forEach((d) => {
    const debtName = d.name || "unknown";
    const debtAmount = d.amount || 0;
    if (!groupedDebts[debtName]) groupedDebts[debtName] = 0;
    groupedDebts[debtName] += debtAmount;
  });

  const data = Object.keys(groupedDebts).map((key, i) => ({
    name: key,
    population: groupedDebts[key],
    color: ["#F39C12", "#1F7A8C", "#8C3FD1", "#E74C3C"][i % 4],
    legendFontColor: colors.secondary,
    legendFontSize: 14,
  }));

  if (data.length === 0) {
    data.push({
      name: "No Data",
      population: 1,
      color: "#bdc3c7",
      legendFontColor: colors.secondary,
      legendFontSize: 14,
    });
  }

  const handleSubmit = async () => {
    try {
      if (!description || !amount) return;
      const result = await classifySpending(description, parseFloat(amount));
      addDebt({
        name: result.category,
        amount: parseFloat(result.amount),
      });
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("AI classification error:", error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/debtsense.png')} style={styles.logoImage} />
            <View>
              <Text style={styles.logoLabel}>DebtSense</Text>
              <Text style={styles.subtitle}>Financial Health Assistant</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Spending Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add Transaction</Text>
        <TextInput
          placeholder="Transaction description (e.g. GrabFood)"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        <TextInput
          placeholder="Monthly Income"
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
          style={styles.input}
        />
        <Button title="ADD SPENDING" onPress={handleSubmit} color="#2196F3" />
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    backgroundColor: "#6A0DAD",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 28,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
  },
  logoLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    marginTop: 1,
  },
  welcomeWrapper: {
    alignItems: "flex-end",
  },
  welcomeSmall: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 2,
  },

  // Body
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: colors.primary },
  chartContainer: { padding: 20, backgroundColor: colors.background },

  // Form
  formContainer: { padding: 20, backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 10, marginBottom: 20, elevation: 3 },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
});
