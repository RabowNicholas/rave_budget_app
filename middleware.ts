import { NextResponse } from "next/server";
import { getAppBaseURL } from "./utils/NavHelper";
import { getAPIBaseURL } from "./utils/ApiHelper";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

const protectedPathPatterns: RegExp[] = [
  /^\/$/,
  /^\/budget/,
  /^\/plan/,
  /^\/pack/,
  /^\/profile/,
];

// Add the routes that should always be accessible
const alwaysAllowedPaths: RegExp[] = [
  /^\/api\//, // Allow all API routes
  /^\/static\//, // Allow all static routes
  /^\/public\//, // Allow public routes, if applicable
  /^\/signIn$/, // Always allow the sign-in page
];

const isProtectedPath = (url: string): boolean => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "demo") {
    return false; // Allow all paths in demo environment
  }

  // Check if the path is in the always allowed paths
  if (alwaysAllowedPaths.some((pattern) => pattern.test(url))) {
    return false; // Allow this path without any checks
  }

  // Check if the path is in the protected paths
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
    if (
      !(await userIsOnboarded(token)) &&
      !req.nextUrl.pathname.startsWith("/onboard")
    ) {
      return NextResponse.redirect(`${getAppBaseURL()}/onboard?rd=${rd}`);
    }
  }

  return NextResponse.next();
}
