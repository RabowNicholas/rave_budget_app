import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { demoBudget } from "./demo-data";

export async function GET(
  req: NextRequestWithAuth,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token?.sub;
    if (!userId) {
      throw new Error("User id not found");
    }

    const { id } = params;

    const apiBaseUrl = getAPIBaseURL();
    if (apiBaseUrl !== "demo") {
      const response = await fetch(`${getAPIBaseURL()}/budgets/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch budget details");
      }

      return NextResponse.json(data);
    } else {
      return NextResponse.json(demoBudget);
    }
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
