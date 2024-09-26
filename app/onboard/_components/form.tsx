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
        window.location.href = redirect; // Redirect after success
      }
    } catch (err) {
      setError("An error occurred while onboarding");
    }
  };
  return (
    <div>
      <div>Onboarding</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
