import { DashboardBudgetOverview } from "@/app/(app)/budget/[id]/model";

export const demoBudget: DashboardBudgetOverview = {
  id: "id",
  name: "EDC 2025",
  date: new Date("2024-07-15"),
  location: "Las Vegas",
  totalBudget: 3000,
  totalSpent: 1250,
  remainingBalance: 1750,
  categoryBreakdown: [
    {
      category: "Tickets",
      budgetedAmount: 1200,
      expenseAmount: 1150,
    },
    {
      category: "Accommodation",
      budgetedAmount: 800,
      expenseAmount: 500,
    },
    {
      category: "Travel",
      budgetedAmount: 500,
      expenseAmount: 300,
    },
    {
      category: "Food & Drinks",
      budgetedAmount: 300,
      expenseAmount: 0,
    },
    {
      category: "Merchandise",
      budgetedAmount: 200,
      expenseAmount: 0,
    },
  ],
};
