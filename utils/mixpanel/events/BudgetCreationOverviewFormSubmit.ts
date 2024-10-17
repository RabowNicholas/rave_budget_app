import mixpanel from "mixpanel-browser";

export default function trackBudgetCreationOverviewFormSubmit() {
  mixpanel.track("budgetCreationOverviewFormSubmit");
}
