import React, { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await base44.auth.me();
        setIsPremium(user?.premium === true);
      } catch {
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const subscribe = async () => {
    // Persist premium flag on user record
    await base44.auth.updateMe({ premium: true });
    setIsPremium(true);
  };

  const cancelSubscription = async () => {
    await base44.auth.updateMe({ premium: false });
    setIsPremium(false);
  };

  return (
    <SubscriptionContext.Provider value={{ isPremium, loading, subscribe, cancelSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
