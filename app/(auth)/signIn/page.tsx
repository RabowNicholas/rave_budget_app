"use client";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <button onClick={() => signIn("auth0")}>sign in with phone number</button>
    </div>
  );
}
