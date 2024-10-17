"use client";
import { ReactNode } from "react";
import MixpanelProvider from "./mixpanel/MixpanelProvider";
import { SessionProvider } from "next-auth/react";

export default function ClientInitializer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <MixpanelProvider>{children}</MixpanelProvider>
    </SessionProvider>
  );
}
