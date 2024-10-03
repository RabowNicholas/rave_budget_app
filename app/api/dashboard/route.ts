import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { demoBudget } from "../budget/[id]/demo-data";

export async function GET(req: NextRequestWithAuth) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = token?.sub;
    if (!userId) {
      throw new Error("User id not found");
    }

    const apiBaseUrl = getAPIBaseURL();
    if (apiBaseUrl !== "demo") {
      const response = await fetch(`${getAPIBaseURL()}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update user onboarding");
      }

      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        budgets: [demoBudget, demoBudget, demoBudget],
      });
    }
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
