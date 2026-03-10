// context/FinancialContext.tsx
import React, { createContext, useState, ReactNode } from "react";

export interface BudgetItem {
  category: string;
  amount: number;
  color: string;
}

export interface DebtItem {
  name: string;
  amount: number;
  type: string; // e.g., "PayLater", "E-Wallet", etc.
}

export interface FinancialContextType {
  budget: BudgetItem[];
  setBudget: (b: BudgetItem[]) => void;
  debts: DebtItem[];
  setDebts: (d: DebtItem[]) => void;
}

export const FinancialContext = createContext<FinancialContextType>({
  budget: [],
  setBudget: () => {},
  debts: [],
  setDebts: () => {},
});

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState<BudgetItem[]>([
    { category: "Food", amount: 210, color: "#8C3FD1" },
    { category: "E-Wallet", amount: 600, color: "#1F7A8C" },
    { category: "PayLater", amount: 320, color: "#F39C12" },
  ]);

  const [debts, setDebts] = useState<DebtItem[]>([
    { name: "Shopee PayLater", amount: 300, type: "PayLater" },
    { name: "GrabPay", amount: 150, type: "E-Wallet" },
    { name: "Lazada Credit", amount: 200, type: "PayLater" },
  ]);

  return (
    <FinancialContext.Provider value={{ budget, setBudget, debts, setDebts }}>
      {children}
    </FinancialContext.Provider>
  );
};

// Default export for Expo Router
export default FinancialProvider;