"use client";
import { useEffect, useState } from "react";
import BudgetOverviewForm from "./_components/BudgetOverviewForm";
import BudgetLimitsForm from "./_components/BudgetLimitsForm";
import BudgetCreationStepIndicator from "./_components/BudgetCreationStepIndiciator";
import { BudgetLimitData, BudgetOverviewData } from "./_components/models";
import { useRouter } from "next/navigation";

export default function Page() {
  const [subpage, setSubpage] = useState<"overview" | "limits">("overview");
  const [overviewData, setOverviewData] = useState<
    BudgetOverviewData | undefined
  >();
  const [limitsData, setLimitsData] = useState<BudgetLimitData[] | undefined>();
  const router = useRouter();

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

        await response.json();
        await router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendData();
  }, [overviewData, limitsData, router]);

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
          overviewData={overviewData}
        />
      );
      break;
    case "limits":
      content = (
        <BudgetLimitsForm
          onBack={() => setSubpage("overview")}
          onSubmitted={(limitsData) => handleLimitsSubmit(limitsData)}
        />
      );
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {content}
      <div className=" w-[90%] justify-center flex mt-6">
        <BudgetCreationStepIndicator
          currentStep={subpage === "overview" ? 0 : 1}
          totalSteps={2}
        />
      </div>
    </div>
  );
}
