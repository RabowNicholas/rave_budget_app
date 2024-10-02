"use client";
import { useState } from "react";
import { BudgetOverviewData } from "./models";

export default function BudgetOverviewForm({
  onSubmitted,
  overviewData,
}: {
  onSubmitted: (overviewData: BudgetOverviewData) => void;
  overviewData: BudgetOverviewData | undefined;
}) {
  const [name, setName] = useState<string | undefined>(overviewData?.name);
  const [date, setDate] = useState<string | undefined>(overviewData?.date);
  const [location, setLocation] = useState<string | undefined>(
    overviewData?.location
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitted({ name: name!, date: date!, location: location! });
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="text-sanJuan flex flex-col gap-2"
      >
        <div className="text-center text-2xl">Create new budget</div>
        <div className="flex flex-col">
          <label className="ml-3" htmlFor="name">
            Festival Name
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter festival name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-3" htmlFor="date">
            Festival Date
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-3" htmlFor="location">
            Festival Location
          </label>
          <input
            className="px-2 py-1 rounded-xl"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter festival location"
            required
          />
        </div>

        <button
          className="button-primary-filled self-center mt-6"
          type="submit"
        >
          Create Budget
        </button>
      </form>
    </div>
  );
}
