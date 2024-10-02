"use client";
import { useState } from "react";
import { BudgetLimitData } from "./models";

export default function BudgetLimitsForm({
  onSubmitted,
  onBack,
}: {
  onSubmitted: (data: BudgetLimitData[]) => void;
  onBack: () => void;
}) {
  const [tickets, setTickets] = useState<number | null>(null);
  const [travel, setTravel] = useState<number | null>(null);
  const [accommodation, setAccommodation] = useState<number | null>(null);
  const [food, setFood] = useState<number | null>(null);
  const [other, setOther] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedData: BudgetLimitData[] = [];

    if (tickets !== null) {
      submittedData.push({ category: "tickets", amount: tickets });
    }
    if (travel !== null) {
      submittedData.push({ category: "travel", amount: travel });
    }
    if (accommodation !== null) {
      submittedData.push({ category: "accommodation", amount: accommodation });
    }
    if (food !== null) {
      submittedData.push({ category: "food", amount: food });
    }
    if (other !== null) {
      submittedData.push({ category: "other", amount: other });
    }

    onSubmitted(submittedData);
  };

  const totalBudget = () => {
    return (
      (tickets ?? 0) +
      (travel ?? 0) +
      (accommodation ?? 0) +
      (food ?? 0) +
      (other ?? 0)
    );
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="h-screen flex flex-col items-center gap-6">
      <button
        onClick={handleBackClick}
        className="button-primary-transparent self-start"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] bg-clip-text text-transparent mb-4 uppercase">
        Enter Budget Limits
      </h1>

      <form
        onSubmit={handleSubmit}
        className="text-white flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="tickets">
            Budget for Tickets
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-slateGray bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple"
            type="number"
            id="tickets"
            value={tickets ?? undefined}
            onChange={(e) => setTickets(Number(e.target.value))}
            placeholder="Enter budget for tickets"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="travel">
            Budget for Travel
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-slateGray bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple"
            type="number"
            id="travel"
            value={travel ?? undefined}
            onChange={(e) => setTravel(Number(e.target.value))}
            placeholder="Enter budget for travel"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="accommodation">
            Budget for Accommodation
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-slateGray bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple"
            type="number"
            id="accommodation"
            value={accommodation ?? undefined}
            onChange={(e) => setAccommodation(Number(e.target.value))}
            placeholder="Enter budget for accommodation"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="food">
            Budget for Food & Drinks
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-slateGray bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple"
            type="number"
            id="food"
            value={food ?? undefined}
            onChange={(e) => setFood(Number(e.target.value))}
            placeholder="Enter budget for food"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="other">
            Budget for Other Expenses
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-slateGray bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple"
            type="number"
            id="other"
            value={other ?? undefined}
            onChange={(e) => setOther(Number(e.target.value))}
            placeholder="Enter budget for other expenses"
          />
        </div>

        <div className="flex flex-col mt-6 gap-2 items-center">
          <div className="text-xl text-white">
            Total Budget: ${totalBudget().toFixed(2)}
          </div>

          <button
            className="button-primary-filled self-center w-full py-3 mt-4"
            type="submit"
          >
            Set Budget Limits
          </button>
        </div>
      </form>
    </div>
  );
}
