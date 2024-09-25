"use client";
import { useEffect, useState } from "react";
import BudgetOverviewForm from "./_components/BudgetOverviewForm";
import BudgetLimitsForm from "./_components/BudgetLimitsForm";

export default function Page() {
  const [subpage, setSubpage] = useState<"overview" | "limits">("overview");
  const [overviewData, setOverviewData] = useState<
    BudgetOverviewData | undefined
  >();
  const [limitsData, setLimitsData] = useState<BudgetLimitData[] | undefined>();

  useEffect(() => {
    const sendData = async () => {
      if (!overviewData || !limitsData) return;

      try {
        const response = await fetch("/api/budget", {
          body: JSON.stringify({
            overview: overviewData,
            limits: limitsData,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to send data");
        }

        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendData();
    //TODO: navigate away
  }, [overviewData, limitsData]);

  const handleOverviewSubmit = (overviewData: BudgetOverviewData) => {
    setOverviewData(overviewData);
    setSubpage("limits");
  };

  const handleLimitsSubmit = (limitsData: BudgetLimitData[]) => {
    setLimitsData(limitsData);
  };

  let content;
  switch (subpage) {
    case "overview":
      content = (
        <BudgetOverviewForm
          onSubmitted={(overviewData) => handleOverviewSubmit(overviewData)}
        />
      );
      break;
    case "limits":
      content = (
        <BudgetLimitsForm
          onSubmitted={(limitsData) => handleLimitsSubmit(limitsData)}
        />
      );
      break;
  }

  return <div>{content}</div>;
}
