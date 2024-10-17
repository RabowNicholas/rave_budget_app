import mixpanel from "mixpanel-browser";

export default function trackExpenseAdded() {
  mixpanel.track("addedExpense");
}
