"use client";
import {
  ArrowForwardRounded,
  CheckroomRounded,
  ConfirmationNumberRounded,
  FlightTakeoffRounded,
  HotelRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function PlanningHubInterestPage() {
  const router = useRouter();
  const handleCTAClick = async () => {
    await fetch("/api/interest/planning-hub", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center text-center gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Imagine the Ultimate Festival Planning Tool.
        </h1>
        <p className="text-lg text-gray-300">
          All your festival essentials—tickets, flights, accommodations, and
          more—all in one place. We&apos;re working on a tool to help you plan
          it all!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ConfirmationNumberRounded className="text-4xl" />
        <ArrowForwardRounded />
        <FlightTakeoffRounded className="text-4xl" />
        <ArrowForwardRounded />
        <HotelRounded className="text-4xl" />
        <ArrowForwardRounded />
        <CheckroomRounded className="text-4xl" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-4">
          <li>
            <strong>Explore festivals:</strong> Find the best events happening
            worldwide.
          </li>
          <li>
            <strong>Plan your journey:</strong> Quickly book flights, hotels,
            and gear with minimal hassle.
          </li>
          <li>
            <strong>All in one place:</strong> Keep everything you need at your
            fingertips—tickets, accommodation, travel, and more.
          </li>
        </ul>
      </div>

      <button onClick={handleCTAClick} className="button-primary-filled">
        i want this feature
      </button>
    </div>
  );
}
