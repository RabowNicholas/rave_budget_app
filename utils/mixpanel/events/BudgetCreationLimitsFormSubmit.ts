import mixpanel from "mixpanel-browser";

export default function trackBudgetCreated() {
  mixpanel.track("budgetCreated");
}
