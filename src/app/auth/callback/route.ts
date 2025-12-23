import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  console.log("[Auth Callback] Starting callback handler");
  console.log("[Auth Callback] Code present:", !!code);
  console.log("[Auth Callback] Origin:", origin);

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("[Auth Callback] Supabase URL configured:", !!supabaseUrl);
    console.log("[Auth Callback] Supabase Anon Key configured:", !!supabaseAnonKey);

    if (supabaseUrl && supabaseAnonKey) {
      const cookieStore = await cookies();

      // Log existing cookies
      const existingCookies = cookieStore.getAll();
      console.log("[Auth Callback] Existing cookies:", existingCookies.map(c => c.name));

      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            const all = cookieStore.getAll();
            console.log("[Auth Callback] getAll called, returning:", all.map(c => c.name));
            return all;
          },
          setAll(cookiesToSet) {
            console.log("[Auth Callback] setAll called with cookies:", cookiesToSet.map(c => ({ name: c.name, hasValue: !!c.value })));
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log("[Auth Callback] Setting cookie:", name, "options:", JSON.stringify(options));
              cookieStore.set(name, value, options);
            });
          },
        },
      });

      console.log("[Auth Callback] Calling exchangeCodeForSession...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      console.log("[Auth Callback] Exchange result - data:", !!data, "session:", !!data?.session, "user:", !!data?.user);

      if (error) {
        console.error("[Auth Callback] Error exchanging code for session:", error.message, error.status);
        // Redirect to auth page with error
        return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error.message)}`);
      }

      if (data?.session) {
        console.log("[Auth Callback] Session obtained successfully, user email:", data.user?.email);
      }
    }
  } else {
    console.log("[Auth Callback] No code provided in URL");
  }

  console.log("[Auth Callback] Redirecting to home page");
  // Redirect to home page after successful auth
  return NextResponse.redirect(`${origin}/`);
}
