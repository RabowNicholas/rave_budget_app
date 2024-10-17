"use client";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import trackSignInAttempt from "@/utils/mixpanel/events/SignInAttempt";

function SignInPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("rd") ?? "/";

  const handleSignInWithPhoneClick = () => {
    trackSignInAttempt();
    signIn("auth0", { callbackUrl: redirect });
  };

  return (
    <div className="relative h-dvh w-screen">
      <video
        src="./assets/hero.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      ></video>
      <div className="flex flex-col gap-8 absolute p-10 bottom-10 w-full text-center z-10">
        <h1 className="text-5xl ">
          this is <strong className="text-mutedLavender"> festfund</strong>
        </h1>
        <p className="text-lg">
          we&apos;re here to help you attend more festivals.
        </p>
        <button
          className="button-primary-filled"
          onClick={handleSignInWithPhoneClick}
        >
          Sign in with Phone Number
        </button>
      </div>
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
