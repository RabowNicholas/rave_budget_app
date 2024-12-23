"use client";

import trackFeatureInterest from "@/utils/mixpanel/events/FeatureInterest";
import { useRouter } from "next/navigation";

export default function PackingListInterestPage() {
  const router = useRouter();

  const handleCTAClick = async () => {
    trackFeatureInterest("packing-list");
    await fetch("/api/interest/packing-list", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Your Ultimate Festival Packing List Generator
        </h1>
        <p className="text-lg text-gray-300">
          Struggling with packing for festivals? We&apos;re working on a tool to
          simplify the process—no more forgetting essentials!
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-4">
          <li>
            <strong>Custom packing lists:</strong> Get packing lists tailored to
            your specific festival needs and location.
          </li>
          <li>
            <strong>Never forget the essentials:</strong> A smart tool that
            keeps you prepared—whether it&apos;s outfits, gear, or accessories.
          </li>
          <li>
            <strong>Pre-festival reminders:</strong> Receive notifications about
            what to pack and when to start packing.
          </li>
        </ul>
      </div>

      <button
        onClick={handleCTAClick}
        className="button-primary-filled sticky bottom-10 z-10"
      >
        i want this feature
      </button>
    </div>
  );
}
