import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../../theme/colors";

interface Lesson {
  title: string;
  content: string;
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  };
}

const lessons: Lesson[] = [
  {
    title: "Track Your Spending",
    content:
      "Keep a record of all your monthly expenses. Use apps or spreadsheets to see where your money goes. This helps prevent overspending and unnecessary debt.",
    quiz: {
      question: "Why is tracking your spending important?",
      options: [
        "To know where your money goes",
        "To ignore debts",
        "To increase credit usage",
        "To spend more impulsively",
      ],
      answer: "To know where your money goes",
    },
  },
  {
    title: "Prioritize Needs over Wants",
    content:
      "Focus on essential expenses like food, rent, and bills. Avoid impulse purchases unless your budget allows.",
    quiz: {
      question: "What should you prioritize in your spending?",
      options: ["Luxury items", "Impulse purchases", "Essential expenses", "Gifts for friends"],
      answer: "Essential expenses",
    },
  },
  {
    title: "Avoid High-Interest Debt",
    content:
      "PayLater and credit card debts grow fast due to interest. Always pay off high-interest debts first to reduce financial risk.",
    quiz: {
      question: "Which debt should you pay off first?",
      options: ["High-interest debt", "Low-interest debt", "No debt", "Friends’ debt"],
      answer: "High-interest debt",
    },
  },
  {
    title: "Create a Budget Plan",
    content:
      "Divide your income into categories: essentials, savings, fun money. Stick to your budget and adjust monthly if needed.",
  },
  {
    title: "Build an Emergency Fund",
    content:
      "Set aside at least 3 months of essential expenses. This prevents borrowing in emergencies and keeps you debt-free.",
  },
  {
    title: "Use AI Assistance",
    content:
      "Your DebtSense AI coach can give you insights on spending patterns and risk scores. Check it regularly to stay on track.",
  },
];

export default function LearnScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleQuiz = (index: number, option: string) => {
    const lesson = lessons[index];
    if (!lesson.quiz) return;

    if (option === lesson.quiz.answer) {
      Alert.alert("Correct ✅", "Great job! You've completed this lesson.");
      setCompletedLessons((prev) => new Set(prev).add(index));
    } else {
      Alert.alert("Incorrect ❌", "Try again or review the lesson.");
    }
  };

  const progress = completedLessons.size / lessons.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Financial Literacy Lessons</Text>

      {/* Cross-platform progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>

      {lessons.map((lesson, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text style={styles.cardTitle}>
              {lesson.title} {completedLessons.has(index) ? "✅" : ""}
            </Text>
          </TouchableOpacity>

          {expanded === index && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.cardContent}>{lesson.content}</Text>

              {lesson.quiz && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.quizQuestion}>{lesson.quiz.question}</Text>
                  {lesson.quiz.options.map((opt, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.quizOption}
                      onPress={() => handleQuiz(index, opt)}
                    >
                      <Text style={styles.quizOptionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: colors.primary, marginBottom: 15 },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: colors.highlight,
    borderRadius: 5,
    marginBottom: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  progressText: { textAlign: "right", marginBottom: 15, color: colors.secondary },
  card: { backgroundColor: colors.card, padding: 15, borderRadius: 12, marginBottom: 15 },
  cardTitle: { fontWeight: "600", fontSize: 18, color: colors.primary },
  cardContent: { color: colors.secondary, fontSize: 14, lineHeight: 20 },
  quizQuestion: { fontWeight: "bold", marginBottom: 8, marginTop: 10, color: colors.primary },
  quizOption: { padding: 10, backgroundColor: colors.highlight, borderRadius: 10, marginBottom: 5 },
  quizOptionText: { color: "#000" },
});