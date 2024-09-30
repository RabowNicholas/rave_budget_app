import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function POST(
  req: NextRequestWithAuth,
  { params }: { params: { feature: string } }
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

    await fetch(`${getAPIBaseURL()}/interest/feature/${params.feature}`, {
      method: "POST",
      headers: {
        "User-Id": userId,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json("interest submitted");
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
