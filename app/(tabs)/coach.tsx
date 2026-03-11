// app/coach.tsx
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { GiftedChat, IMessage, User, Bubble, BubbleProps, SystemMessage } from "react-native-gifted-chat";
import colors from "../../theme/colors";
import { FinancialContext } from "../context/FinancialContext";

const BOT_AVATAR = require("../../assets/images/coinbot.png");

export default function Coach() {
  const BOT_NAME = "DebtSense AI";
  const { debts, budget } = useContext(FinancialContext);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const getAIReply = async (userMessage: string) => {
    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
    const totalBudget = budget.reduce((sum, b) => sum + b.amount, 0);

    try {
      const response = await fetch("http://10.11.120.59:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          debt: totalDebt,
          budget: totalBudget,
        })
      });

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.log(error);
      return "Unable to connect to AI server."
    }
  };


  const onSend = async (newMessages: IMessage[] = []) => {
    setMessages((prev) => (GiftedChat as any).append(prev, newMessages));
    const userMessage = newMessages[0].text;
    setIsTyping(true);

    const replyText = await getAIReply(userMessage);

    const aiReply: IMessage = {
      _id: Math.random().toString(),
      text: replyText,
      createdAt: new Date(),
      user: { _id: 2, name: BOT_NAME, avatar: BOT_AVATAR} as User,
    };

    setMessages((prev) => (GiftedChat as any).append(prev, [aiReply]));
    setIsTyping(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={BOT_AVATAR} style={styles.botAvatar} />
        <Text style={styles.headerText}>
          {isTyping ? `${BOT_NAME} is typing...` : `Chatting with ${BOT_NAME}`}
        </Text>
      </View>

      <GiftedChat
        {...(GiftedChat as any)}
        messages={messages}
        onSend={(msgs: IMessage[] = []) => onSend(msgs)}
        user={{ _id: 1 } as User}
        placeholder="Type your message..."
        showUserAvatar
        alwaysShowSend
        isTyping={isTyping}
        renderBubble={(props: BubbleProps<IMessage>) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: colors.secondary },
              right: { backgroundColor: colors.primary },
            }}
            textStyle={{ left: { color: "#fff" }, right: { color: "#fff" } }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  headerText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 10 },
  botAvatar: { width: 40, height: 40, borderRadius: 20 },
});
