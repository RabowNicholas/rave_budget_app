"use client";
import { useState } from "react";

export default function BudgetOverviewForm({
  onSubmitted,
}: {
  onSubmitted: (overviewData: BudgetOverviewData) => void;
}) {
  const [name, setName] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitted({ name: name!, date: date!, location: location! });
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="name">Festival Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter festival name"
            required
          />
        </div>

        <div>
          <label htmlFor="date">Festival Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Festival Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter festival location"
            required
          />
        </div>

        <div>
          <button type="submit">Create Budget</button>
        </div>
      </form>
    </div>
  );
}
