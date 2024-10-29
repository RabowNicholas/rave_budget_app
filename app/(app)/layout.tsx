import type { Metadata } from "next";
import ".././globals.css";
import ".././buttons.css";
import Navbar from "./_components/navbar/Navbar";
import ClientInitializer from "@/utils/ClientIntializer";

export const metadata: Metadata = {
  title: "festfund",
  description: "we're here to help you go to more festivals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  return (
    <html lang="en">
      <body className="flex lg:flex-row sm:flex-col bg-darkBackground min-h-dvh lg:p-0 sm:px-6 text-lightGrayText">
        {env === "demo" && (
          <div className="text-xl text-center absolute z-10 bg-white rounded-md text-darkBackground px-2 py-1">
            This is a demo
          </div>
        )}
        <ClientInitializer>
          <Navbar />
          {children}
        </ClientInitializer>
      </body>
    </html>
  );
}
