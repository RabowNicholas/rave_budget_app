import { getAPIBaseURL } from "@/utils/ApiHelper";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function PUT(req: NextRequestWithAuth) {
  try {
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

    return NextResponse.json({ message: "User onboarded successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
