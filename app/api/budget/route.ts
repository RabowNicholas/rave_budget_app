import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
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
        "User-Id": token?.sub!,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to post budget data: ${response.statusText}`);
    }

    return NextResponse.json({ message: "Budget data submitted successfully" });
  } catch (error) {
    console.error("Error posting budget data:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the budget data" },
      { status: 500 }
    );
  }
}
