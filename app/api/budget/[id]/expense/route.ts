import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getAppBaseURL } from "@/utils/NavHelper";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req });
    const userId = token?.sub;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, category } = await req.json();

    if (!amount || !category) {
      return NextResponse.json(
        { error: "Amount and category are required fields" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${getAPIBaseURL()}/budgets/${params.id}/expense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Id": userId,
        },
        body: JSON.stringify({
          amount,
          category,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add expense: ${errorText}`);
    }

    await response.json();

    return NextResponse.redirect(`${getAppBaseURL()}/budget/${params.id}`);
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the expense" },
      { status: 500 }
    );
  }
}
