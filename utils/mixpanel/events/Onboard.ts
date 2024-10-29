import mixpanel from "mixpanel-browser";

export default function trackUserOnboarded() {
  mixpanel.track("userOnboarded");
}
