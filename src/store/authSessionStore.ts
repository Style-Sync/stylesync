import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

import type { AuthError, Session, User } from "@supabase/supabase-js";

type AuthErrorField = "email" | "password" | "confirmPassword" | null;

type AuthSessionState = {
  session: Session | null;
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
  errorField: AuthErrorField;
  statusMessage: string | null;
};

type AuthSessionActions = {
  setSession: (session: Session | null) => void;
  setInitialized: (isInitialized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  setError: (params: { message: string | null; field?: AuthErrorField }) => void;
  setStatusMessage: (statusMessage: string | null) => void;
  initialize: (session: Session | null) => void;
  clearSession: () => void;
  signInWithGoogle: () => Promise<boolean>;
  signInWithPassword: (email: string, password: string) => Promise<boolean>;
  signUpWithPassword: (params: {
    email: string;
    password: string;
    nickname?: string;
  }) => Promise<boolean>;
  signOut: () => Promise<void>;
};

type AuthSessionStore = AuthSessionState & AuthSessionActions;

const initialState: AuthSessionState = {
  session: null,
  user: null,
  isInitialized: false,
  isLoading: true,
  isAuthenticated: false,
  errorMessage: null,
  errorField: null,
  statusMessage: null,
};

const getSessionState = (session: Session | null): Partial<AuthSessionState> => ({
  session,
  user: session?.user ?? null,
  isAuthenticated: Boolean(session?.user),
  isLoading: false,
  errorMessage: null,
  errorField: null,
  statusMessage: null,
});

const mapAuthError = (
  error: Pick<AuthError, "message" | "status" | "code">,
  context: "signIn" | "signUp" | "oauth" | "signOut"
): { message: string; field: AuthErrorField } => {
  const normalizedMessage = error.message.toLowerCase();

  if (
    error.code === "invalid_credentials" ||
    normalizedMessage.includes("invalid login credentials")
  ) {
    return {
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      field: "password",
    };
  }

  if (error.code === "email_not_confirmed" || normalizedMessage.includes("email not confirmed")) {
    return {
      message: "이메일 인증 후 다시 로그인해 주세요.",
      field: "email",
    };
  }

  if (
    error.code === "user_already_exists" ||
    normalizedMessage.includes("user already registered")
  ) {
    return {
      message: "이미 가입된 이메일입니다.",
      field: "email",
    };
  }

  if (
    normalizedMessage.includes("password should be at least") ||
    normalizedMessage.includes("weak password")
  ) {
    return {
      message: "비밀번호 조건을 다시 확인해 주세요.",
      field: "password",
    };
  }

  if (normalizedMessage.includes("rate limit") || normalizedMessage.includes("security purposes")) {
    return {
      message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
      field: context === "signUp" ? "email" : null,
    };
  }

  if (context === "signIn") {
    return {
      message: "로그인 중 문제가 발생했습니다. 입력값을 다시 확인해 주세요.",
      field: "password",
    };
  }

  if (context === "signUp") {
    return {
      message: "회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.",
      field: null,
    };
  }

  if (context === "oauth") {
    return {
      message: "소셜 로그인 중 문제가 발생했습니다. 다시 시도해 주세요.",
      field: null,
    };
  }

  return {
    message: "처리 중 문제가 발생했습니다. 다시 시도해 주세요.",
    field: null,
  };
};

export const useAuthSessionStore = create<AuthSessionStore>((set) => ({
  ...initialState,

  setSession: (session) =>
    set({
      ...getSessionState(session),
    }),

  setInitialized: (isInitialized) => set({ isInitialized }),

  setLoading: (isLoading) => set({ isLoading }),

  setErrorMessage: (errorMessage) => set({ errorMessage, errorField: null }),

  setError: ({ message, field = null }) =>
    set({
      errorMessage: message,
      errorField: field,
      isLoading: false,
    }),

  setStatusMessage: (statusMessage) => set({ statusMessage }),

  initialize: (session) =>
    set({
      ...getSessionState(session),
      isInitialized: true,
    }),

  clearSession: () =>
    set({
      ...initialState,
      isInitialized: true,
      isLoading: false,
    }),

  signInWithGoogle: async () => {
    const supabase = createClient();

    set({
      isLoading: true,
      errorMessage: null,
      statusMessage: null,
    });

    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/auth/callback?next=/` : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      const mappedError = mapAuthError(error, "oauth");
      set({
        isLoading: false,
        errorMessage: mappedError.message,
        errorField: mappedError.field,
      });
      return false;
    }

    return true;
  },

  signInWithPassword: async (email, password) => {
    const supabase = createClient();

    set({
      isLoading: true,
      errorMessage: null,
      statusMessage: null,
    });

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const mappedError = mapAuthError(error, "signIn");
      set({
        isLoading: false,
        errorMessage: mappedError.message,
        errorField: mappedError.field,
      });
      return false;
    }

    set({
      ...getSessionState(session),
      isInitialized: true,
    });

    return true;
  },

  signUpWithPassword: async ({ email, password, nickname }) => {
    const supabase = createClient();

    set({
      isLoading: true,
      errorMessage: null,
      statusMessage: null,
    });

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: nickname ? { nickname } : undefined,
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback?next=/`
            : undefined,
      },
    });

    if (error) {
      const mappedError = mapAuthError(error, "signUp");
      set({
        isLoading: false,
        errorMessage: mappedError.message,
        errorField: mappedError.field,
      });
      return false;
    }

    set({
      ...getSessionState(session),
      isInitialized: true,
      statusMessage: session
        ? "회원가입이 완료되었습니다."
        : "가입 확인 이메일을 확인한 뒤 로그인해 주세요.",
    });

    return true;
  },

  signOut: async () => {
    const supabase = createClient();
    set({
      isLoading: true,
      errorMessage: null,
      statusMessage: null,
    });

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      const mappedError = mapAuthError(error, "signOut");
      set({
        isLoading: false,
        errorMessage: mappedError.message,
        errorField: mappedError.field,
      });
      return;
    }

    set({
      ...initialState,
      isInitialized: true,
      isLoading: false,
    });
  },
}));
