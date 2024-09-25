import { useState } from "react";

export default function BudgetLimitsForm({
  onSubmitted,
}: {
  onSubmitted: (data: BudgetLimitData[]) => void;
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

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tickets">Budget for Tickets</label>
          <input
            type="number"
            id="tickets"
            value={tickets ?? undefined}
            onChange={(e) => setTickets(Number(e.target.value))}
            placeholder="Enter budget for tickets"
          />
        </div>

        <div>
          <label htmlFor="travel">Budget for Travel</label>
          <input
            type="number"
            id="travel"
            value={travel ?? undefined}
            onChange={(e) => setTravel(Number(e.target.value))}
            placeholder="Enter budget for travel"
          />
        </div>

        <div>
          <label htmlFor="accommodation">Budget for Accommodation</label>
          <input
            type="number"
            id="accommodation"
            value={accommodation ?? undefined}
            onChange={(e) => setAccommodation(Number(e.target.value))}
            placeholder="Enter budget for accommodation"
          />
        </div>

        <div>
          <label htmlFor="food">Budget for Food & Drinks</label>
          <input
            type="number"
            id="food"
            value={food ?? undefined}
            onChange={(e) => setFood(Number(e.target.value))}
            placeholder="Enter budget for food"
          />
        </div>

        <div>
          <label htmlFor="other">Budget for Other Expenses</label>
          <input
            type="number"
            id="other"
            value={other ?? undefined}
            onChange={(e) => setOther(Number(e.target.value))}
            placeholder="Enter budget for other expenses"
          />
        </div>

        <div>Total Budget: {totalBudget()}</div>

        <div>
          <button type="submit">Set Budget Limits</button>
        </div>
      </form>
    </div>
  );
}
