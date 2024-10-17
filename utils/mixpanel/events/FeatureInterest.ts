import mixpanel from "mixpanel-browser";

export default function trackFeatureInterest(feature: string) {
  mixpanel.track("featureInterest", { feature: feature });
}
