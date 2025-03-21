import { SpendingCoachData, Insight, SavingsGoal, Transaction } from '@/types/spending-coach';

const mockInsights: Insight[] = [
  {
    id: '1',
    title: "Spending Alert",
    message: "You're spending 30% more on dining this month",
    type: "warning",
    icon: "plus.circle.fill",
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: "Saving Opportunity",
    message: "Set aside $200 this week to reach your goal",
    type: "info",
    icon: "plus.circle.fill",
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: "Goal Achievement",
    message: "You've reached your Emergency Fund goal!",
    type: "success",
    icon: "plus.circle.fill",
    createdAt: new Date().toISOString()
  }
];

const mockGoals: SavingsGoal[] = [
  {
    id: '1',
    name: "Vacation Fund",
    current: 2500,
    target: 5000,
    dueDate: "2023-12-31",
    category: "travel",
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: "Emergency Fund",
    current: 4000,
    target: 10000,
    dueDate: "2024-03-31",
    category: "emergency",
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: "New Car",
    current: 15000,
    target: 35000,
    dueDate: "2024-06-30",
    category: "vehicle",
    createdAt: new Date().toISOString()
  }
];

const mockBalance = {
  available: 2450.00,
  pending: 150.00,
  lastUpdated: new Date().toISOString()
};

const mockOverview = {
  spent: 3200,
  budget: 5000,
  biggestSaving: {
    percentage: 15,
    category: "Groceries"
  },
  topCategory: {
    name: "Dining"
  }
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    icon: 'cart.fill',
    title: 'Grocery Store',
    amount: -156.32,
    date: new Date().toISOString()
  },
  {
    id: '2',
    icon: 'house.fill',
    title: 'Rent Payment',
    amount: -1200.00,
    date: new Date().toISOString()
  },
  {
    id: '3',
    icon: 'dollarsign.circle.fill',
    title: 'Salary Deposit',
    amount: 3500.00,
    date: new Date().toISOString()
  }
];

export class SpendingCoachService {
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getData(): Promise<SpendingCoachData> {
    // Simulate network delay
    await this.delay(1000);
    
    return {
      balance: mockBalance,
      insights: mockInsights,
      goals: mockGoals,
      overview: mockOverview,
      transactions: mockTransactions
    };
  }

  static async refreshData(): Promise<SpendingCoachData> {
    // Simulate network delay
    await this.delay(1500);
    
    // Update some values to simulate real data changes
    mockBalance.available = Math.round((mockBalance.available + (Math.random() * 100 - 50)) * 100) / 100;
    mockBalance.lastUpdated = new Date().toISOString();
    
    return {
      balance: mockBalance,
      insights: mockInsights,
      goals: mockGoals,
      overview: mockOverview,
      transactions: mockTransactions
    };
  }
}


