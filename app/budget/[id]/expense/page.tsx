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
    <div>
      <h1>Add Expense to {budget.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {budget.categoryBreakdown.map((breakdown) => (
              <option key={breakdown.category} value={breakdown.category}>
                {breakdown.category}
              </option>
            ))}
            <option value="unexpected">unexpected</option>
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
