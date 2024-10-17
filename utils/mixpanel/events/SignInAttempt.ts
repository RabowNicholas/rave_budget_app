import mixpanel from "mixpanel-browser";

export default function trackSignInAttempt() {
  mixpanel.track("signInAttempt");
}
