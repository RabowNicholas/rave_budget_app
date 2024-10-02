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
    <div className="flex flex-col text-sanJuan items-center">
      <button
        onClick={handleBackClick}
        className="button-primary-transparent self-start ml-6 mt-4"
      >
        back
      </button>
      <div className="text-3xl">Enter budget limits</div>
      <form onSubmit={handleSubmit} className="flex flex-col my-6 gap-2">
        <div className="flex flex-col">
          <label className="ml-2" htmlFor="tickets">
            Budget for Tickets
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="number"
            id="tickets"
            value={tickets ?? undefined}
            onChange={(e) => setTickets(Number(e.target.value))}
            placeholder="Enter budget for tickets"
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-2" htmlFor="travel">
            Budget for Travel
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="number"
            id="travel"
            value={travel ?? undefined}
            onChange={(e) => setTravel(Number(e.target.value))}
            placeholder="Enter budget for travel"
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-2" htmlFor="accommodation">
            Budget for Accommodation
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="number"
            id="accommodation"
            value={accommodation ?? undefined}
            onChange={(e) => setAccommodation(Number(e.target.value))}
            placeholder="Enter budget for accommodation"
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-2" htmlFor="food">
            Budget for Food & Drinks
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="number"
            id="food"
            value={food ?? undefined}
            onChange={(e) => setFood(Number(e.target.value))}
            placeholder="Enter budget for food"
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-2" htmlFor="other">
            Budget for Other Expenses
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="number"
            id="other"
            value={other ?? undefined}
            onChange={(e) => setOther(Number(e.target.value))}
            placeholder="Enter budget for other expenses"
          />
        </div>
        <div className="flex flex-col mt-6 gap-2 items-center">
          <div className="text-xl">Total Budget: {totalBudget()}</div>

          <button className="button-primary-filled" type="submit">
            Set Budget Limits
          </button>
        </div>
      </form>
    </div>
  );
}
