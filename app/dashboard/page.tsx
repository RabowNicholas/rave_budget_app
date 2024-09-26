"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data?.budgets.map((budget) => (
        <div key={budget.id} className="budget-container">
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
                <p>Spent Amount: ${breakdown.expenseAmount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
