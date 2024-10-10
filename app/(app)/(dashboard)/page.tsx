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
          href="/budget/new"
          className="button-primary-filled w-fit self-end mb-4"
        >
          <AddRounded className="text-lg mr-2" />
          add new budget
        </Link>
        <div className="space-y-6">
          {data.budgets.length === 0 ? (
            <p className="text-lg text-center">
              looks like you&apos;re just getting started.{" "}
              <strong className="text-mutedLavender">festfund</strong> helps you{" "}
              <strong className="text-mutedLavender">plan and track</strong>{" "}
              every festival expense, from tickets and travel to food and
              merch—so you don&apos;t have to stress about overspending. get
              your{" "}
              <strong className="text-mutedLavender">budget set up now</strong>{" "}
              and let us handle the math while you enjoy the good times!
            </p>
          ) : (
            data.budgets.map((budget) => (
              <BudgetOverviewTile key={budget.id} budget={budget} />
            ))
          )}
        </div>
      </div>
    );
  }
}
