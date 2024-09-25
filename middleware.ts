import { NextResponse } from "next/server";
import { getAppBaseURL } from "./utils/NavHelper";
import { getAPIBaseURL } from "./utils/ApiHelper";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

//TODO: replace with real routes. these are examples
const protectedPathPatterns: RegExp[] = [/^\/dashboard/, /^\/budget\/*/];

const isProtectedPath = (url: string): boolean => {
  return protectedPathPatterns.some((pattern) => pattern.test(url));
};

const userIsOnboarded = async (token: JWT) => {
  const res = await fetch(`${getAPIBaseURL()}/users/${token.name}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.onboarded;
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
