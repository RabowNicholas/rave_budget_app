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
  } else if (data.budgets.length === 0) {
    return (
      <div className="lg:border-4 lg:border-lightBackground lg:rounded-md lg:max-w-[400px] lg:max-h-[400px] lg:p-4 lg:m-6 flex flex-col lg:items-start sm:items-center">
        <div className=" text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] w-fit bg-clip-text text-transparent mb-4 uppercase">
          Budgets
        </div>
        <Link href="/budget/new" className="button-primary-filled w-fit mb-4">
          <AddRounded className="text-lg mr-2" />
          add new budget
        </Link>
        <div className="space-y-6">
          <p className="text-lg text-center">
            looks like you&apos;re just getting started.{" "}
            <strong className="text-mutedLavender">festfund</strong> helps you{" "}
            <strong className="text-mutedLavender">plan and track</strong> every
            festival expense, from tickets and travel to food and merch—so you
            don&apos;t have to stress about overspending. get your{" "}
            <strong className="text-mutedLavender">budget set up now</strong>{" "}
            and let us handle the math while you enjoy the good times!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="lg:border-4 lg:border-lightBackground lg:rounded-md lg:p-4 lg:m-6 flex flex-col lg:items-start sm:items-center w-full">
        <div className="sm:self-center lg:self-start text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] w-fit bg-clip-text text-transparent mb-4 uppercase">
          Budgets
        </div>
        <Link
          href="/budget/new"
          className="lg:hidden button-primary-filled mb-4"
        >
          <AddRounded className="text-lg mr-2" />
          add new budget
        </Link>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full">
          {data.budgets.map((budget) => (
            <BudgetOverviewTile key={budget.id} budget={budget} />
          ))}
          <Link
            href="/budget/new"
            className="sm:hidden lg:block button-primary-filled hover:scale-105 transition duration-300"
          >
            <div className="flex items-center justify-center h-full">
              <AddRounded className="text-lg mr-2" />
              <p>add new budget</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
