"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export type SubscriptionTier = "free" | "premium";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  subscription_expires_at: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProfile = async (userId: string, userEmail?: string, userMetadata?: Record<string, string>) => {
    try {
      // Fetch profile from Supabase database
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // If profile doesn't exist (new user), create one with defaults
        if (error.code === "PGRST116") {
          const newProfile: UserProfile = {
            id: userId,
            email: userEmail || user?.email || "",
            name: userMetadata?.full_name || userMetadata?.name || user?.user_metadata?.full_name || null,
            avatar_url: userMetadata?.avatar_url || user?.user_metadata?.avatar_url || null,
            subscription_tier: "free",
            subscription_expires_at: null,
          };
          setProfile(newProfile);
          return;
        }
        console.error("Error fetching profile:", error);
        // Fallback to default profile on error
        const defaultProfile: UserProfile = {
          id: userId,
          email: userEmail || user?.email || "",
          name: userMetadata?.full_name || userMetadata?.name || null,
          avatar_url: userMetadata?.avatar_url || null,
          subscription_tier: "free",
          subscription_expires_at: null,
        };
        setProfile(defaultProfile);
        return;
      }

      setProfile({
        id: data.id,
        email: data.email,
        name: data.name,
        avatar_url: data.avatar_url,
        subscription_tier: data.subscription_tier || "free",
        subscription_expires_at: data.subscription_expires_at,
      });
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      // Fallback to default profile on exception
      const defaultProfile: UserProfile = {
        id: userId,
        email: userEmail || user?.email || "",
        name: userMetadata?.full_name || userMetadata?.name || null,
        avatar_url: userMetadata?.avatar_url || null,
        subscription_tier: "free",
        subscription_expires_at: null,
      };
      setProfile(defaultProfile);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const initAuth = async () => {
      console.log("[AuthContext] Initializing auth...");

      // Set a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        if (isSubscribed && loading) {
          console.log("[AuthContext] Timeout reached, setting loading to false");
          setLoading(false);
        }
      }, 3000);

      try {
        console.log("[AuthContext] Calling getSession...");
        const { data, error } = await supabase.auth.getSession();
        console.log("[AuthContext] getSession returned - data:", !!data, "error:", error?.message);

        const currentSession = data?.session;
        console.log("[AuthContext] getSession result - session:", !!currentSession);

        if (!isSubscribed) {
          clearTimeout(timeoutId);
          return;
        }

        if (currentSession?.user) {
          console.log("[AuthContext] Session found with user:", currentSession.user.email);
          setSession(currentSession);
          setUser(currentSession.user);
          setLoading(false);

          await fetchProfile(
            currentSession.user.id,
            currentSession.user.email,
            currentSession.user.user_metadata as Record<string, string>
          );
        } else {
          console.log("[AuthContext] No session found");
          setUser(null);
          setSession(null);
          setLoading(false);
        }

        clearTimeout(timeoutId);
      } catch (err) {
        console.error("[AuthContext] Error during init:", err);
        if (isSubscribed) setLoading(false);
      }
      console.log("[AuthContext] Init complete");
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: string, newSession: Session | null) => {
        console.log("[AuthContext] Auth state changed:", _event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchProfile(
            newSession.user.id,
            newSession.user.email,
            newSession.user.user_metadata as Record<string, string>
          );
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    console.log("Attempting Google OAuth with redirectTo:", redirectUrl);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    console.log("OAuth response - data:", data, "error:", error);

    if (error) {
      console.error("Google OAuth error:", error);
    }

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    console.log("[AuthContext] Signing out...");

    // Clear local state first for immediate UI update
    setProfile(null);
    setUser(null);
    setSession(null);

    // Clear auth cookies manually
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name.startsWith("sb-")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });

    // Try Supabase signOut without blocking
    supabase.auth.signOut().catch((err: Error) => {
      console.error("[AuthContext] Supabase signOut error:", err);
    });

    console.log("[AuthContext] Signed out");
    window.location.href = "/";
  };

  // Check if user has active premium subscription
  // Premium is active if: tier is "premium" AND (no expiry date OR expiry date is in the future)
  const isPremium = profile?.subscription_tier === "premium" &&
    (!profile?.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date());

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      isPremium,
      signInWithGoogle,
      signIn,
      signUp,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
