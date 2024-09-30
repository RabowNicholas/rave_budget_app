"use client";
import { useEffect, useState } from "react";
import { DashboardBudgetOverview } from "./model";

export default function BudgetDetails({ params }: { params: { id: string } }) {
  const [budget, setBudget] = useState<DashboardBudgetOverview | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch(`/api/budget/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch budget details");
        }
        const data = await response.json();
        setBudget(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBudgetData();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!budget) {
    return <div>No budget found.</div>;
  }

  return (
    <div className="budget-details">
      <h2>{budget.name}</h2>
      <p>Date: {new Date(budget.date).toLocaleDateString()}</p>
      <p>Location: {budget.location}</p>
      <p>Total Budget: ${budget.totalBudget.toFixed(2)}</p>
      <p>Total Spent: ${budget.totalSpent.toFixed(2)}</p>
      <p>Remaining Balance: ${budget.remainingBalance.toFixed(2)}</p>

      <div className="category-breakdown">
        <h3>Category Breakdown</h3>
        {budget.categoryBreakdown.map((breakdown) => (
          <div key={breakdown.category} className="category-item">
            <p>Category: {breakdown.category}</p>
            <p>Budgeted Amount: ${breakdown.budgetedAmount.toFixed(2)}</p>
            <p>
              Spent Amount: $
              {breakdown.budgetedAmount
                ? breakdown.expenseAmount.toFixed(2)
                : 0}
            </p>
          </div>
        ))}
      </div>

      {/* You can add more sections here, such as expense breakdown, etc. */}
    </div>
  );
}
