export function getAppBaseURL() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  if (env === "local") {
    return "http://localhost:3000";
  } else {
    return "https://fest-fund.com";
  }
}
