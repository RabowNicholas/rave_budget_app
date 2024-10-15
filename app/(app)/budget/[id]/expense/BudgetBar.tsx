import React from "react";

export default function BudgetBar({
  budgetedAmount,
  expenseAmount,
}: {
  budgetedAmount: number;
  expenseAmount: number;
}) {
  const percentageUsed = Math.min((expenseAmount / budgetedAmount) * 100, 100); // Ensure it doesn't go over 100%

  let barColor = "bg-green-700";
  if (percentageUsed === 100) {
    barColor = "bg-red-700";
  } else if (percentageUsed > 80) {
    barColor = "bg-yellow-700";
  }

  return (
    <div className="flex flex-col items-center">
      <div className=" bg-gray-200 h-6 rounded-lg overflow-hidden w-full">
        <div
          style={{ width: `${percentageUsed}%` }}
          className={`${barColor} h-full transition-all duration-300`}
        ></div>
      </div>
      <div className="mt-2 text-sm">
        {expenseAmount > budgetedAmount
          ? `Over budget by $${(expenseAmount - budgetedAmount).toFixed(2)}`
          : `Budget used: $${expenseAmount.toFixed(
              2
            )} of $${budgetedAmount.toFixed(2)}`}
      </div>
    </div>
  );
}
