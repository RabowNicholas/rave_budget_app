import trackUserOnboarded from "@/utils/mixpanel/events/Onboard";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OnboardForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setError(""); // Clear error

    try {
      const response = await fetch("/api/onboard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), redirect }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Failed to onboard");
      } else {
        trackUserOnboarded();
        window.location.href = redirect;
      }
    } catch (err) {
      setError("An error occurred while onboarding");
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center h-dvh ">
      <form
        className="flex flex-col gap-6 w-full text-white max-w-[400px] lg:border lg:border-3 lg:border-lightBackground lg:rounded-md lg:px-8 lg:py-6"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-[#A100FF] via-[#FFD700] to-[#00A676] w-fit bg-clip-text text-transparent mb-4 uppercase">
          Onboarding
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-3 text-lg " htmlFor="name">
            Name{" "}
          </label>
          <input
            className="px-4 py-2 rounded-lg border-2 border-transparent bg-mediumGray text-white focus:outline-none focus:ring-2 focus:ring-vibrantPurple placeholder-white"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="button-primary-filled" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
