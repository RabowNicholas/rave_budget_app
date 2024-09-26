"use client";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// SignIn component logic
function SignInPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";

  return (
    <div>
      <button onClick={() => signIn("auth0", { callbackUrl: redirect })}>
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
