export interface DashboardData {
  budgets: DashboardBudgetOverview[];
}

interface DashboardBudgetOverview {
  id: string;
  name: string;
  date: Date;
  location: string;
  totalBudget: number;
  totalSpent: number;
  remainingBalance: number;
  categoryBreakdown: BudgetCategoryBreakdown[];
}

interface BudgetCategoryBreakdown {
  category: string;
  budgetedAmount: number;
  expenseAmount: number;
}
