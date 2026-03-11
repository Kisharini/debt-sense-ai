import React, { createContext, useState, ReactNode } from "react";

export interface BudgetItem {
  category: string;
  amount: number;
}

export interface DebtItem {
  name: string;
  amount: number;
}

export interface FinancialContextType {
  budget: BudgetItem[];
  setBudget: (b: BudgetItem[]) => void;
  totalSpending: number;   // <- add this
  debts: DebtItem[];
  addDebt: (d: DebtItem) => void;
  removeDebt: (name: string) => void;
  clearDebts: () => void;
}

export const FinancialContext = createContext<FinancialContextType>({
  budget: [],
  setBudget: () => {},
  totalSpending: 0,
  debts: [],
  addDebt: () => {},
  removeDebt: () => {},
  clearDebts: () => {},
});

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState<BudgetItem[]>([
    { category: "Food", amount: 210 },
    { category: "E-Wallet", amount: 600 },
    { category: "PayLater", amount: 320 },
  ]);

  const [debts, setDebts] = useState<DebtItem[]>([
    { name: "Shopee PayLater", amount: 300 },
    { name: "GrabPay", amount: 150 },
    { name: "Lazada Credit", amount: 200 },
  ]);

  const addDebt = (debt: DebtItem) => setDebts((prev) => [...prev, debt]);
  const removeDebt = (name: string) => setDebts((prev) => prev.filter((d) => d.name !== name));
  const clearDebts = () => setDebts([]);

  // Compute total spending dynamically
  const totalSpending = budget.reduce((sum, b) => sum + (b.amount ?? 0), 0);

  return (
    <FinancialContext.Provider
      value={{ budget, setBudget, totalSpending, debts, addDebt, removeDebt, clearDebts }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export default FinancialProvider;
