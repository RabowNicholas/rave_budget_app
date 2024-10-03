import { NextResponse } from "next/server";
import { getAppBaseURL } from "./utils/NavHelper";
import { getAPIBaseURL } from "./utils/ApiHelper";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

//TODO: replace with real routes. these are examples
const protectedPathPatterns: RegExp[] = [/^\/dashboard/, /^\/budget\/*/];

const isProtectedPath = (url: string): boolean => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "demo") {
    return false;
  }
  return protectedPathPatterns.some((pattern) => pattern.test(url));
};

const userIsOnboarded = async (token: JWT) => {
  const apiBaseUrl = getAPIBaseURL();
  if (apiBaseUrl !== "demo") {
    const res = await fetch(`${apiBaseUrl}/users/${token.name}`, {
      method: "GET",
    });
    const data = await res.json();
    return data.onboarded;
  } else {
    return true;
  }
};

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });

  if (isProtectedPath(req.nextUrl.pathname)) {
    const rd = `${getAppBaseURL()}${req.nextUrl.pathname}`;
    if (!token) {
      return NextResponse.redirect(`${getAppBaseURL()}/signIn?rd=${rd}`);
    }
    if (!userIsOnboarded(token)) {
      return NextResponse.redirect(`${getAppBaseURL()}/onboard?rd=${rd}`);
    }
  }
  return NextResponse.next();
}
