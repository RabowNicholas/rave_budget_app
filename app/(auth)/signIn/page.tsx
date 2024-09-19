"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";
  return (
    <div>
      <button onClick={() => signIn("auth0", { callbackUrl: redirect })}>
        sign in with phone number
      </button>
    </div>
  );
}
