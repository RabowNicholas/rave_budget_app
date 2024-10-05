"use client";
import { useEffect, useState } from "react";
import { DashboardData } from "./model";
import BudgetOverviewTile from "./BudgetOverviewTile";
import { AddRounded } from "@mui/icons-material";
import Link from "next/link";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>error fetching dashboard</div>;
  } else {
    return (
      <div className="flex flex-col">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] w-fit bg-clip-text text-transparent mb-4 uppercase">
          Budgets
        </div>
        <Link
          href="/budgets/new"
          className="button-primary-filled w-fit self-end mb-4"
        >
          <AddRounded className="text-lg mr-2" />
          add new budget
        </Link>
        <div className="space-y-6">
          {data.budgets.map((budget) => (
            <BudgetOverviewTile key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
    );
  }
}
