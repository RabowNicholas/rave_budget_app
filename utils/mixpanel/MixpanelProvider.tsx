"use client";
import mixpanel from "mixpanel-browser";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

interface MixpanelContextProps {
  initialized: boolean;
}

const MixpanelContext = createContext<MixpanelContextProps | undefined>(
  undefined
);

export default function MixpanelProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!initialized) {
      const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!;

      mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === "development", // Enable debug mode in development
        track_pageview: "full-url",
        persistence: "localStorage",
      });
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized && session?.user) {
      const userId = session.user.id || session.user.email;
      if (userId) {
        mixpanel.identify(userId);

        mixpanel.people.set({
          $id: userId,
          $email: session.user.email,
          $name: session.user.name,
        });
      }
    }
  }, [initialized, session]);

  return (
    <MixpanelContext.Provider value={{ initialized }}>
      {children}
    </MixpanelContext.Provider>
  );
}
