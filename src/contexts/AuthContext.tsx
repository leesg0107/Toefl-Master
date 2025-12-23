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
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(
          session.user.id,
          session.user.email,
          session.user.user_metadata as Record<string, string>
        );
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(
            session.user.id,
            session.user.email,
            session.user.user_metadata as Record<string, string>
          );
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
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
    await supabase.auth.signOut();
    setProfile(null);
  };

  // Check if user has active premium subscription
  const isPremium = profile?.subscription_tier === "premium" &&
    (profile?.subscription_expires_at ? new Date(profile.subscription_expires_at) > new Date() : false);

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
