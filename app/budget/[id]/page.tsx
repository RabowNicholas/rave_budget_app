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
    return <div className="text-center p-6 text-white">Loading...</div>;
  }

  if (!budget) {
    return <div className="text-center p-6 text-white">No budget found.</div>;
  }

  const totalSpent = budget.totalSpent.toFixed(2);
  const remainingBalance = budget.remainingBalance.toFixed(2);

  return (
    <div className="flex flex-col p-6 bg-shadowGray rounded-lg shadow-lg space-y-6 text-black">
      <h2 className="text-3xl font-semibold bg-clip-text text-darkBackground">
        {budget.name}
      </h2>

      <div className="space-y-2">
        <div className="flex justify-around">
          <p className="text-sm text-black">
            Date: {new Date(budget.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-black">Location: {budget.location}</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Total Budget:</span>
          <span className="text-green-700">
            ${budget.totalBudget.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Total Spent:</span>
          <span className="text-blue-700">${totalSpent}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Remaining Balance:</span>
          <span className="text-red-700">${remainingBalance}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/budget/${params.id}/expense`}
            className="button-primary-filled w-full text-center"
          >
            <AddRounded className="text-lg mr-2" />
            Add Expense
          </Link>
          <button
            onClick={handleAddPeopleClick}
            className="button-primary-transparent w-full"
          >
            <AddRounded className="text-lg" />
            Add People
          </button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown space-y-4">
        <h3 className="text-2xl font-semibold">Category Breakdown</h3>
        {budget.categoryBreakdown.map((breakdown) => (
          <div
            key={breakdown.category}
            className="flex flex-col space-y-2 border-t border-gray-600 pt-4"
          >
            <div className="flex justify-between text-sm">
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
    </div>
  );
}
