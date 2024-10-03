export function getAPIBaseURL() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  if (env === "local") {
    return "http://localhost:8000";
  } else if (env === "demo") {
    return "demo";
  } else if (env === "test") {
    //return test
  } else if (env === "prod") {
    //return prod
  }
}
