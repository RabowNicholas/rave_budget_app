"use client";
import { getAPIBaseURL } from "@/utils/ApiHelper";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OnboardPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError("Fix missing fields");
    }

    await fetch("/api/onboard", {
      method: "PUT",
      body: JSON.stringify({ name: name, redirect: redirect }),
    });
  };

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  return (
    <div>
      <div>onboarding</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
