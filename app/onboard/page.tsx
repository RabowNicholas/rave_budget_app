"use client";
import { Suspense } from "react";
import OnboardForm from "./_components/form";

export default function OnboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardForm />
    </Suspense>
  );
}
