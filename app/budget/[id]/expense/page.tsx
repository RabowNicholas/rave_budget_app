"use client";
import { useEffect, useState } from "react";
import { DashboardBudgetOverview } from "../model";

export default function Page({ params }: { params: { id: string } }) {
  const [budget, setBudget] = useState<DashboardBudgetOverview | undefined>();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`/api/budget/${params.id}/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, category }),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      await response.json();
    } catch (error) {
      setError("Failed to add expense");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!budget) {
    return <div>No budget found.</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] bg-clip-text text-transparent mb-4 uppercase">
        Add Expense to {budget.name}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="text-white flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="amount">
            Amount
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white"
            type="number"
            id="amount"
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="category">
            Category
          </label>
          <select
            className="px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" hidden disabled>
              Select a category
            </option>
            {budget.categoryBreakdown.map((breakdown) => (
              <option key={breakdown.category} value={breakdown.category}>
                {breakdown.category}
              </option>
            ))}
            <option value="unexpected">unexpected</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="button-primary-filled self-center w-full py-3 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
