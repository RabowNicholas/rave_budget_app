"use client";
import { useState } from "react";
import { BudgetOverviewData } from "./models";
import trackBudgetCreationOverviewFormSubmit from "@/utils/mixpanel/events/BudgetCreationOverviewFormSubmit";

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
    trackBudgetCreationOverviewFormSubmit();
    onSubmitted({ name: name!, date: date!, location: location! });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="text-white flex flex-col gap-4 w-full max-w-[400px] lg:border lg:border-3 lg:border-lightBackground lg:rounded-md lg:px-8 lg:py-6"
      >
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] bg-clip-text text-transparent uppercase">
            Budget Details
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg" htmlFor="name">
            Festival Name
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter festival name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg" htmlFor="date">
            Festival Date
          </label>
          <input
            className="w-full h-10 px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white appearance-none" // Full width and consistent styling
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg" htmlFor="location">
            Festival Location
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter festival location"
            required
          />
        </div>

        <button
          className="button-primary-filled self-center mt-6 w-full py-3"
          type="submit"
        >
          next
        </button>
      </form>
    </div>
  );
}
