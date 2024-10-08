import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiBaseUrl = getAPIBaseURL();
    if (apiBaseUrl !== "demo") {
      const token = await getToken({ req });
      const userId = token?.sub;
      if (!userId) {
        throw new Error("User id not found");
      }
      const data = await req.json();

      const limits = data.limits
        .filter((limit: { amount: number | null }) => limit.amount !== null)
        .map((limit: { category: string; amount: number }) => ({
          category: limit.category,
          amount: limit.amount,
        }));

      const response = await fetch(`${getAPIBaseURL()}/budgets`, {
        method: "POST",
        body: JSON.stringify({
          overview: {
            name: data.overview.name,
            date: data.overview.date,
            location: data.overview.location,
          },
          limits: limits,
        }),
        headers: {
          "User-Id": userId,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to post budget data: ${response.statusText}`);
      }

      return NextResponse.json({
        message: "Budget data submitted successfully",
      });
    } else {
      return NextResponse.json({ message: "This is a demo" });
    }
  } catch (error) {
    console.error("Error posting budget data:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the budget data" },
      { status: 500 }
    );
  }
}
