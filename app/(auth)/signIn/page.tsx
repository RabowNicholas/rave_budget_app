"use client";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SignInPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="button-primary-filled"
        onClick={() => signIn("auth0", { callbackUrl: redirect })}
      >
        Sign in with Phone Number
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}
