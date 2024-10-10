import Link from "next/link";
import { DashboardBudgetOverview } from "../budget/[id]/model";

export default function BudgetOverviewTile({
  budget,
}: {
  budget: DashboardBudgetOverview;
}) {
  const totalSpent = budget.totalSpent.toFixed(2);
  const remainingBalance = budget.remainingBalance.toFixed(2);

  return (
    <div className="flex flex-col p-6 bg-shadowGray rounded-lg shadow-lg  text-black w-full md:w-1/3 lg:w-1/4">
      <h2 className="text-2xl font-semibold bg-clip-text text-darkBackground">
        {budget.name}
      </h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm text-black">
            {new Date(budget.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-black">{budget.location}</p>
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

        <Link href={`/budget/${budget.id}`}>
          <button className="button-primary-transparent w-full text-center">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
