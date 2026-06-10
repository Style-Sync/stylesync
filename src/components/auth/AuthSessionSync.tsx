"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuthSessionStore } from "@/store/authSessionStore";

export const AuthSessionSync = () => {
  const initialize = useAuthSessionStore((state) => state.initialize);
  const setSession = useAuthSessionStore((state) => state.setSession);
  const setInitialized = useAuthSessionStore((state) => state.setInitialized);
  const setLoading = useAuthSessionStore((state) => state.setLoading);
  const setErrorMessage = useAuthSessionStore((state) => state.setErrorMessage);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const syncInitialSession = async () => {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setInitialized(true);
        setLoading(false);
        return;
      }

      initialize(session);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitialized(true);
    });

    void syncInitialSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [initialize, setErrorMessage, setInitialized, setLoading, setSession]);

  return null;
};
