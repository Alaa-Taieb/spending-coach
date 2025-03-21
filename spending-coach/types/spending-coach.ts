import { IconSymbolName } from "@/components/ui/IconSymbol";

export type InsightType = 'warning' | 'info' | 'success' | 'error';

export interface Insight {
  id: string;
  title: string;
  message: string;
  type: InsightType;
  icon: IconSymbolName;
  createdAt: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  dueDate: string;
  createdAt: string;
  category: string;
}

export interface Balance {
  available: number;
  pending: number;
  lastUpdated: string;
}

export interface Overview {
  spent: number;
  budget: number;
  biggestSaving: {
    percentage: number;
    category: string;
  };
  topCategory: {
    name: string;
  };
}

export interface Transaction {
  id: string;
  icon: IconSymbolName;
  title: string;
  amount: number;
  date: string;
}

export interface SpendingCoachData {
  balance: Balance;
  insights: Insight[];
  goals: SavingsGoal[];
  overview: Overview;
  transactions: Transaction[];
}

