import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function PUT(req: NextRequestWithAuth) {
  try {
    const apiBaseUrl = getAPIBaseURL();
    if (apiBaseUrl !== "demo") {
      const token = await getToken({ req });
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const data = await req.json();

      const response = await fetch(`${getAPIBaseURL()}/users/onboard`, {
        method: "PUT",
        body: JSON.stringify({ phone: token.name, name: data.name }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update user onboarding");
      }

      return NextResponse.redirect(data.redirect);
    } else {
      return NextResponse.redirect("/");
    }
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
