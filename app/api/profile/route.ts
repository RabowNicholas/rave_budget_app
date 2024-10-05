import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function GET(req: NextRequestWithAuth) {
  try {
    const apiBaseUrl = getAPIBaseURL();
    if (apiBaseUrl !== "demo") {
      const token = await getToken({ req });
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const userId = token?.sub;
      if (!userId) {
        throw new Error("User id not found");
      }

      const response = await fetch(`${apiBaseUrl}/users/id/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return NextResponse.json({ name: data.name, phone: data.phone });
    } else {
      return NextResponse.json({ name: "deadmau5", phone: "+1801-555-1234" });
    }
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequestWithAuth) {
  try {
    const apiBaseUrl = getAPIBaseURL();

    if (apiBaseUrl !== "demo") {
      const token = await getToken({ req });
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const userId = token?.sub;
      if (!userId) {
        throw new Error("User id not found");
      }

      const { name } = await req.json();
      if (!name) {
        return NextResponse.json(
          { error: "Name is required" },
          { status: 400 }
        );
      }

      const response = await fetch(`${apiBaseUrl}/users/id/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user name");
      }

      const data = await response.json();

      return NextResponse.json({ name: data.name });
    } else {
      return NextResponse.json({ name: "deadmau5" });
    }
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
