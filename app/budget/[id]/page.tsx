"use client";
import { useEffect, useState } from "react";
import { DashboardBudgetOverview } from "./model";
import { AddRounded } from "@mui/icons-material";
import Link from "next/link";
import BudgetBar from "./expense/BudgetBar";

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

  const handleAddPeopleClick = async () => {
    await fetch("/api/interest/group-budget", { method: "POST" });
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!budget) {
    return <div className="text-center p-6">No budget found.</div>;
  }

  const totalSpent = budget.totalSpent.toFixed(2);
  const remainingBalance = budget.remainingBalance.toFixed(2);

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg space-y-4">
      {/* Budget Overview Title */}
      <h2 className="text-3xl font-semibold text-gray-800">{budget.name}</h2>
      <p className="text-sm text-gray-600">
        Date: {new Date(budget.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600">Location: {budget.location}</p>

      {/* Total Budget Overview */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-800">
          <span className="font-medium">Total Budget:</span>
          <span className="text-green-600">
            ${budget.totalBudget.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-800">
          <span className="font-medium">Total Spent:</span>
          <span className="text-blue-600">${totalSpent}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-800">
          <span className="font-medium">Remaining Balance:</span>
          <span className="text-red-600">${remainingBalance}</span>
        </div>

        {/* Add People Button */}
        <button
          onClick={handleAddPeopleClick}
          className="mt-2 button-primary-transparent"
        >
          <AddRounded className="text-lg mr-2" />
          Add People
        </button>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800">
          Category Breakdown
        </h3>
        {budget.categoryBreakdown.map((breakdown) => (
          <div
            key={breakdown.category}
            className="flex flex-col space-y-2 border-t border-gray-200 pt-2"
          >
            <div className="flex justify-between text-sm text-gray-800">
              <span className="font-medium">
                Category: {breakdown.category}
              </span>
            </div>
            <BudgetBar
              budgetedAmount={breakdown.budgetedAmount}
              expenseAmount={breakdown.expenseAmount}
            />
          </div>
        ))}
      </div>

      {/* Add Expense Button */}
      <Link
        href={`/budget/${params.id}/expense`}
        className="mt-2 inline-block button-primary-filled text-center"
      >
        <AddRounded className="text-lg mr-2" />
        Add Expense
      </Link>
    </div>
  );
}
